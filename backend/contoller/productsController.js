const mongoose = require("mongoose");
const slugify = require("slugify");
const Product = require("../model/Products");

const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const dotenv = require('dotenv')

dotenv.config();

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer para receber arquivos em memória
const upload = multer({ storage: multer.memoryStorage() });

// Middleware para upload de múltiplas imagens (até 4)
const uploadImages = upload.array("images", 4);

// Helpers
const isObjectId = (val) => mongoose.Types.ObjectId.isValid(String(val));

// Removido requireAuth local - usar middleware de auth.js

const isOwner = (product, userId) => product?.ownerId?.toString() === String(userId);
const isAdmin = (user) => user?.role === "admin";

// Inicializa índices
Product.init()
  .then(() => console.log("Índices criados com sucesso"))
  .catch((err) => console.log("Erro ao criar índices:", err));

// ===================== GET por ID =====================
const getProductId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !isObjectId(id)) {
      return res.status(400).json({ message: "ID inválido", error: true, data: {} });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Produto não encontrado", error: true, data: {} });

    res.status(200).json({ message: "Produto encontrado", error: false, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar produto", error: true, data: {} });
  }
};

// ===================== LISTAGEM e pesquisa de  =====================
const listProducts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);
    const skip = (page - 1) * limit;

    const { q, categoryId, subcategoryId, district, city, condition, ownerId, reserved, donated, sort = "-createdAt" } = req.query;

    const filter = {};

    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ title: { $regex: regex } }, { description: { $regex: regex } }];
    }

    if (categoryId && isObjectId(categoryId)) filter.categoryId = categoryId;
    if (subcategoryId && isObjectId(subcategoryId)) filter.subcategoryId = subcategoryId;
    if (district) filter.district = district;
    if (city) filter.city = city;
    if (condition) filter.condition = condition;
    if (ownerId && isObjectId(ownerId)) filter.ownerId = ownerId;

    if (reserved === "true") filter.reservedBy = { $ne: null };
    if (reserved === "false") filter.reservedBy = null;

    if (donated === "true") filter.donatedTo = { $ne: null };
    if (donated === "false") filter.donatedTo = null;

    const allowedSorts = new Set(["createdAt", "-createdAt", "title", "-title", "city", "-city"]);
    const sortSafe = allowedSorts.has(sort) ? sort : "-createdAt";

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortSafe).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      error: false,
      message: "Busca realizada com sucesso",
      data: items,
      meta: { total, page, limit, pages: Math.ceil(total / limit), sort: sortSafe },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Erro ao buscar produtos", data: [] });
  }
};

const productCreate = async (req, res) => {
  try {
    const ownerFromAuth = req.user._id || req.userId;
    const { title, description, condition, district, city, categoryId, subcategoryId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "ID de categoria inválido", error: true });
    }
    if (subcategoryId && !mongoose.Types.ObjectId.isValid(subcategoryId)) {
      return res.status(400).json({ message: "ID de subcategoria inválido", error: true });
    }
    
    const uploadedImages = await Promise.all(
      req.files.map(file =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "produtos" },
            (err, result) => (err ? reject(err) : resolve(result.secure_url))
          ).end(file.buffer);
        })
      )
    );

    console.log("Recebi arquivos:", req.files.length);
    console.log("Fazendo upload...");
    console.log("Imagens enviadas:", uploadedImages);    

    const productData = {
      title,
      description,
      condition,
      images: uploadedImages,
      district,
      city,
      citySlug: city ? slugify(city) : undefined,
      categoryId,
      subcategoryId,
      ownerId: ownerFromAuth,
    };

    const product = await new Product(productData).save();

    res.status(201).json({ message: "Produto criado", error: false, data: product });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao criar produto", error: true, data: {} });
  }
};

// ===================== UPDATE =====================
const productUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isObjectId(id)) return res.status(400).json({ message: "ID inválido", error: true, data: {} });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Produto não encontrado", error: true, data: {} });

    const userId = req.user._id || req.userId;
    if (!(isOwner(product, userId) || isAdmin(req.user))) {
      return res.status(403).json({ message: "Sem permissão", error: true, data: {} });
    }

    const updateData = { ...req.body };
    if (updateData.city) updateData.citySlug = slugify(updateData.city);

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "Produto atualizado", error: false, data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar produto", error: true, data: {} });
  }
};

// ===================== DELETE =====================
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isObjectId(id)) return res.status(400).json({ message: "ID inválido", error: true, data: {} });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Produto não encontrado", error: true, data: {} });

    const userId = req.user._id || req.userId;
    if (!(isOwner(product, userId) || isAdmin(req.user))) {
      return res.status(403).json({ message: "Sem permissão para deletar", error: true, data: {} });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Produto deletado", error: false, data: { id } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar produto", error: true, data: {} });
  }
};

// ===================== RESERVA DE PRODUTO =====================
const reserveProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { reservedUntil } = req.body; // ISO date string opcional

    if (!isObjectId(id)) {
      return res.status(400).json({ error: true, message: "ID do produto inválido", data: {} });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: true, message: "Produto não encontrado", data: {} });
    }

    const userId = req.user._id || req.userId;

    // Impedir reservar o próprio produto
    if (isOwner(product, userId)) {
      return res.status(400).json({
        error: true,
        message: "Você não pode reservar seu próprio produto",
        data: {},
      });
    }

    // Verificar se já está reservado por outro
    if (product.reservedBy && product.reservedBy.toString() !== userId.toString()) {
      return res.status(409).json({ error: true, message: "Produto já está reservado", data: {} });
    }

    // Validar reservedUntil (se enviado)
    let until = null;
    if (reservedUntil) {
      const d = new Date(reservedUntil);
      if (isNaN(d.getTime()) || d <= new Date()) {
        return res.status(400).json({
          error: true,
          message: "reservedUntil inválido (use data futura)",
          data: {},
        });
      }
      until = d;
    }

    // Reservar produto
    product.reservedBy = userId;
    product.reservedUntil = until || null;
    product.status = "RESERVADO";
    await product.save();

    return res.status(200).json({
      error: false,
      message: "Produto reservado com sucesso",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Erro ao reservar produto", data: {} });
  }
};

// ===================== CANCELAR RESERVA =====================
const unreserveProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isObjectId(id)) {
      return res.status(400).json({ error: true, message: "ID do produto inválido", data: {} });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: true, message: "Produto não encontrado", data: {} });
    }

    const userId = req.user._id || req.userId;

    // Apenas quem reservou ou o dono pode cancelar
    if (product.reservedBy && product.reservedBy.toString() !== userId.toString() && !isOwner(product, userId)) {
      return res.status(403).json({
        error: true,
        message: "Sem permissão para cancelar esta reserva",
        data: {},
      });
    }

    if (!product.reservedBy) {
      return res.status(400).json({
        error: true,
        message: "Produto não está reservado",
        data: {},
      });
    }

    // Cancelar reserva
    product.reservedBy = null;
    product.reservedUntil = null;
    product.status = "DISPONÍVEL";
    await product.save();

    return res.status(200).json({
      error: false,
      message: "Reserva cancelada com sucesso",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Erro ao cancelar reserva", data: {} });
  }
};

// ===================== DOAÇÃO DE PRODUTO =====================
const donateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { receiverId } = req.body; // ID do usuário que receberá

    if (!isObjectId(id)) {
      return res.status(400).json({ error: true, message: "ID do produto inválido", data: {} });
    }

    if (receiverId && !isObjectId(receiverId)) {
      return res.status(400).json({ error: true, message: "ID do receptor inválido", data: {} });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: true, message: "Produto não encontrado", data: {} });
    }

    const userId = req.user._id || req.userId;

    // Apenas o dono pode doar
    if (!isOwner(product, userId)) {
      return res.status(403).json({
        error: true,
        message: "Apenas o dono pode doar este produto",
        data: {},
      });
    }

    if (product.donatedTo) {
      return res.status(400).json({
        error: true,
        message: "Produto já foi doado",
        data: {},
      });
    }

    const finalReceiverId = receiverId || product.reservedBy;

    if (!finalReceiverId) {
      return res.status(400).json({
        error: true,
        message: "É necessário fornecer um receptor ou o produto deve estar reservado",
        data: {},
      });
    }

    product.donatedTo = finalReceiverId;
    product.reservedBy = null;
    product.reservedUntil = null;
    product.status = "DOADO";
    await product.save();

    return res.status(200).json({
      error: false,
      message: "Produto doado com sucesso",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Erro ao doar produto", data: {} });
  }
};

// ===================== HISTÓRICO DE DOAÇÕES DO USUÁRIO =====================
const getUserDonations = async (req, res) => {
  try {
    const userId = req.user._id;

    const donatedProducts = await Product.find({
      ownerId: userId,
      status: 'DOADO',
    })
    .populate('donatedTo', 'name email') 
    .sort('-updatedAt');

    const receivedProducts = await Product.find({
      donatedTo: userId,
    })
    .populate('ownerId', 'name email')
    .sort('-updatedAt');

    res.status(200).json({
      error: false,
      message: "Histórico de doações recuperado com sucesso",
      data: {
        donated: donatedProducts,
        received: receivedProducts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Erro ao buscar histórico de doações", data: {} });
  }
};

// ===================== HISTÓRICO DE RESERVAS DO USUÁRIO =====================
const getUserReservations = async (req, res) => {
    try {
        const userId = req.user._id;
        const reservations = await Product.find({ reservedBy: userId, status: 'RESERVADO' })
            .populate('ownerId', 'name email')
            .sort('-updatedAt');
        res.status(200).json({ error: false, message: "Reservas recuperadas com sucesso", data: reservations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: "Erro ao buscar reservas", data: {} });
    }
};

// ===================== EXPORT =====================
module.exports = {
  getProductId,
  listProducts,
  productCreate,
  productUpdate,
  deleteProduct,
  reserveProduct,
  unreserveProduct,
  donateProduct,
  getUserDonations,
  getUserReservations,
  uploadImages,
};
