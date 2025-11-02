const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const sendEmail = require("../utils/sendEmail");

const User = require("../model/User");
const Conversation = require('../model/Conversation');
const Products = require('../model/Products');
const Message = require('../model/Message');


/** ========================= RECUPERAÇÃO DE SENHA ========================= */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const msg = { message: "Se o e-mail existir, enviaremos instruções." };

    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.json(msg);

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const codeHash = crypto.createHash("sha256").update(code).digest("hex");

    user.resetCodeHash = codeHash;
    user.resetCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutos
    user.resetCodeAttempts = 0;
    await user.save();

    await sendEmail(
      user.email,
      "Código para redefinir senha - EcoDoa",
      `Olá! Seu código de redefinição é: ${code}\n\nEle expira em 10 minutos.`
    );

    return res.json(msg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao enviar e-mail de redefinição." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.status(400).json({ message: "Código inválido" });

    const codeHash = crypto.createHash("sha256").update(String(code)).digest("hex");
    const expired = !user.resetCodeExpires || user.resetCodeExpires < Date.now();
    const match = user.resetCodeHash && user.resetCodeHash === codeHash;
    const tooMany = (user.resetCodeAttempts ?? 0) >= 5;

    if (expired || tooMany || !match) {
      user.resetCodeAttempts = (user.resetCodeAttempts ?? 0) + 1;
      await user.save();
      return res.status(400).json({ message: "Código inválido ou expirado" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetCodeHash = undefined;
    user.resetCodeExpires = undefined;
    user.resetCodeAttempts = 0;
    await user.save();

    return res.json({ message: "Senha atualizada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao redefinir senha." });
  }
};

// CHAT ==================================================

function getDonorId(productDoc) { // serve pra saber quem é o doador do produto
  return productDoc?.donorId || productDoc?.owner || productDoc?.userId;
}

const createConversation = async (req, res) => {
  try {
    const { itemId } = req.body;

    // ✅ converte itemId para ObjectId (se Conversation.itemId é ObjectId)
    const itemObjectId = new mongoose.Types.ObjectId(itemId);

    const product = await Products.findById(itemObjectId).select('donorId owner userId');
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    const donorId = getDonorId(product);
    if (!donorId) return res.status(500).json({ error: 'Campo doador ausente no produto' });

    if (String(donorId) === req.user.id) {
      return res.status(400).json({ error: 'Você não pode iniciar conversa consigo mesmo' });
    }

    // ✅ ordena como string e reconverte para ObjectId para salvar/buscar
    const participantsStr = [donorId, req.user.id].map(String).sort();
    const participants = participantsStr.map(id => new mongoose.Types.ObjectId(id));

    let conv = await Conversation.findOne({ itemId: itemObjectId, participants });
    if (!conv) conv = await Conversation.create({ itemId: itemObjectId, participants });

    res.json(conv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar conversa' });
  }
};

const listConversations = async (req, res) => {
  try {
    const convs = await Conversation.find({ participants: req.user.id })
      .sort({ lastMessageAt: -1 })
      .lean();

    if (convs.length === 0) return res.json([]);

    const ids = convs.map(c => c._id);
    const lastMsgs = await Message.aggregate([
      { $match: { conversationId: { $in: ids } } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: '$conversationId', last: { $first: '$$ROOT' } } },
    ]);

    const map = new Map(lastMsgs.map(m => [String(m._id), m.last]));
    res.json(convs.map(c => ({ ...c, lastMessage: map.get(String(c._id)) || null })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar conversas' });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const { before, limit = 30 } = req.query;

    const conv = await Conversation.findById(id);
    if (!conv || !conv.participants.some(p => String(p) === req.user.id)) {
      return res.status(404).json({ error: 'Conversa não encontrada' });
    }

    const q = { conversationId: new mongoose.Types.ObjectId(id) };
    if (before) q.createdAt = { $lt: new Date(before) };

    const msgs = await Message.find(q).sort({ createdAt: -1 }).limit(Number(limit)).lean();
    res.json(msgs.reverse());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar mensagens' });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;

    const conv = await Conversation.findById(id);
    if (!conv || !conv.participants.some(p => String(p) === req.user.id)) {
      return res.status(404).json({ error: 'Conversa não encontrada' });
    }

    const text = String(body || '').trim();
    if (!text) {
      return res.status(400).json({ error: 'Mensagem vazia' });
    }
    if (text.length > 2000) { // opcional
      return res.status(400).json({ error: 'Mensagem muito longa' });
    }

    const msg = await Message.create({
      conversationId: new mongoose.Types.ObjectId(id),
      senderId: new mongoose.Types.ObjectId(req.user.id),
      body: text,
      readBy: [new mongoose.Types.ObjectId(req.user.id)],
    });

    conv.lastMessageAt = new Date();
    await conv.save();

    if (req.io) {
      req.io.to(`conv:${id}`).emit('message:new', {
        _id: msg._id,
        body: msg.body,
        senderId: msg.senderId,
        createdAt: msg.createdAt,
      });
    }

    res.status(201).json(msg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar mensagem' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const conv = await Conversation.findById(id);
    if (!conv || !conv.participants.some(p => String(p) === req.user.id)) {
      return res.status(404).json({ error: 'Conversa não encontrada' });
    }

    await Message.updateMany(
      { conversationId: new mongoose.Types.ObjectId(id), readBy: { $ne: new mongoose.Types.ObjectId(req.user.id) } },
      { $push: { readBy: new mongoose.Types.ObjectId(req.user.id) } }
    );

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao marcar mensagens como lidas' });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
  createConversation,
  listConversations,
  getMessages,
  sendMessage,
  markAsRead,
};
