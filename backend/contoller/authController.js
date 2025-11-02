const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const User = require("../model/User");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const msg = { message: "Se o e-mail existir, enviaremos instruções." };

    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.json(msg);

    // Gera código e salva hash + expiração
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

// Confirmar código e trocar senha
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.status(400).json({ message: "Código inválido" });

    const codeHash = crypto
      .createHash("sha256")
      .update(String(code))
      .digest("hex");

    const expired =
      !user.resetCodeExpires || user.resetCodeExpires < Date.now();
    const match = user.resetCodeHash && user.resetCodeHash === codeHash;
    const tooMany = (user.resetCodeAttempts ?? 0) >= 5;

    if (expired || tooMany || !match) {
      user.resetCodeAttempts = (user.resetCodeAttempts ?? 0) + 1;
      await user.save();
      return res.status(400).json({ message: "Código inválido ou expirado" });
    }

    // Atualiza senha
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
