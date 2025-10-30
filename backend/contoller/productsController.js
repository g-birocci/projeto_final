const mongoose = require("mongoose");
let slugify;
try {
  slugify = require("slugify");
} catch (e) {
  // Fallback temporário — APAGAR quando instalar a dependência 'slugify'
  slugify = (s) =>
    String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
}
const Product = require("../model/Products");

// Helpers temporários — APAGAR quando middleware/funções reais forem implementados
const isObjectId = (val) => mongoose.Types.ObjectId.isValid(String(val)); // APAGAR após integrar validação real
const requireAuth = (req, res) => {
  // Em produção, substituir por autenticação real (JWT, sessão, etc.)
  if (!req.user) req.user = { id: "000000000000000000000000", role: "user" }; // APAGAR após integrar auth real
  return true; // APAGAR após integrar auth real
};
const isOwner = (product, userId) => product?.ownerId?.toString() === String(userId); // APAGAR após integrar regra real
const isAdmin = (user) => user?.role === "admin"; // APAGAR após integrar regra real

Product.init()
  .then(() => console.log("Ìndices criados com sucesso"))
  .catch((err) => console.log("Erro ao criar índices:", err));

const getProductId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Id não fornecido",
        error: true,
        data: {},
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Produto não encontratdo",
        error: true,
        data: {},
      });
    }

    res.status(200).json({
      message: "Produto encontrado com sucesso",
      error: false,
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erro em buscar o produto",
      error: false,
      data: {},
    });
  }
};

const productSearch = async (req, res) => {
  try {
    const { query } = req.query;
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || "20", 10), 1),
      100
    );
    const skip = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({
        error: true,
        message: "Parâmetro de busca ausente",
        data: [],
      });
    }

    const regex = new RegExp(query, "i");
    const filter = {
      $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
    };

    const [items, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    return res.status(200).json({
      error: false,
      message: "Busca realizada com sucesso",
      data: items,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Erro ao buscar produtos",
      data: [],
    });
  }
};

const productCreate = async (req, res) => {
  try {
    const ownerFromAuth = req.user?.id; // prexciso receber a autenticação, ver com o mario isso amanhã.

    const { title, description, condition, images, district, city, citySlug, categoryId, subcategoryId, ownerId, reservedBy, reservedUntil, donatedTo } = req.body;

    const productData = {
      title,
      description,
      condition,
      images,
      district,
      city,
      citySlug: citySlug || (city ? slugify(city) : undefined),
      categoryId,
      subcategoryId,
      ownerId: ownerId || ownerFromAuth, // prioriza auth
      reservedBy,
      reservedUntil,
      donatedTo,
    };

    try {
      const product = new Product(productData);
      await product.save();
      return res
        .status(201)
        .json({ message: "Produto criado", error: false, data: product });
    } catch (err) {
      if (err.name === "ValidationError") {
        return res.status(400).json({
          message: "Erro de validação",
          error: true,
          data: err.errors,
        });
      }
      console.error(err);
      return res
        .status(500)
        .json({ message: "Erro ao criar produto", error: true, data: {} });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao criar produto",
      error: true,
      data: {},
    });
  }
};

const productUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error: true, message: "ID do produto inválido", data: {} });
    }

    const {
      title,
      description,
      condition,
      images,
      district,
      city,
      citySlug,
      categoryId,
      subcategoryId,
      reservedBy,
      reservedUntil,
      donatedTo,
    } = req.body;

    const updateProduto = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        description,
        condition,
        images,
        district,
        city,
        citySlug: citySlug || (city ? slugify(city) : undefined), // vereficar isso
        categoryId,
        subcategoryId,
        reservedBy,
        reservedUntil,
        donatedTo,
      },
      {
        new: true,
      }
    );

    if (!updateProduto) {
      return res
        .status(404)
        .json({ error: true, message: "Produto não encontrado", data: {} });
    }

    return res.status(200).json({
      error: false,
      message: "Produto atualizado com sucesso",
      data: updateProduto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error,
      error: true,
      data: {},
    });
  }
};

const listProducts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || "20", 10), 1),
      100
    );
    const skip = (page - 1) * limit;

    const {
      q,
      categoryId,
      subcategoryId,
      district,
      city,
      condition,
      ownerId,
      reserved,
      donated,
      sort = "-createdAt",
    } = req.query;

    const filter = {};

    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }
    if (categoryId && isObjectId(categoryId)) filter.categoryId = categoryId;
    if (subcategoryId && isObjectId(subcategoryId))
      filter.subcategoryId = subcategoryId;
    if (district) filter.district = district;
    if (city) filter.city = city;
    if (condition) filter.condition = condition;
    if (ownerId && isObjectId(ownerId)) filter.ownerId = ownerId;

    // reserved: true => há reservedBy; false => não há
    if (typeof reserved === "string") {
      filter.reservedBy = reserved === "true" ? { $ne: null } : null;
    }

    // donated: true => há donatedTo; false => não há
    if (typeof donated === "string") {
      filter.donatedTo = donated === "true" ? { $ne: null } : null;
    }

    // ordenação segura (whitelist)
    const allowedSorts = new Set([
      "createdAt",
      "-createdAt",
      "title",
      "-title",
      "city",
      "-city",
    ]);
    const sortSafe = allowedSorts.has(sort) ? sort : "-createdAt";

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortSafe).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    return res.status(200).json({
      error: false,
      message: "Listagem realizada com sucesso",
      data: items,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
        sort: sortSafe,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Erro ao listar produtos",
      data: [],
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!isObjectId(categoryId)) {
      return res
        .status(400)
        .json({ error: true, message: "categoryId inválido", data: [] });
    }
    req.query.categoryId = categoryId; // eu reaproveito listProducts
    return listProducts(req, res);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Erro ao buscar por categoria", data: [] });
  }
};

const getProductsBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    if (!isObjectId(subcategoryId)) {
      return res
        .status(400)
        .json({ error: true, message: "subcategoryId inválido", data: [] });
    }
    req.query.subcategoryId = subcategoryId; // eu reaproveito listProducts
    return listProducts(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Erro ao buscar por subcategoria",
      data: [],
    });
  }
};

//Não faz sentido || o Doador pode fazer isso 
const reserveProduct = async (req, res) => {
  try {
    if (!requireAuth(req, res)) return;

    const { id } = req.params;
    const { reservedUntil } = req.body; // ISO date string opcional

    if (!isObjectId(id)) {
      return res
        .status(400)
        .json({ error: true, message: "ID do produto inválido", data: {} });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ error: true, message: "Produto não encontrado", data: {} });
    }

    // opcional: impedir reservar o próprio produto
    if (isOwner(product, req.user.id)) {
      return res.status(400).json({
        error: true,
        message: "Você não pode reservar seu próprio produto",
        data: {},
      });
    }

    // já reservado por outro
    if (product.reservedBy && product.reservedBy.toString() !== req.user.id) {
      return res
        .status(409)
        .json({ error: true, message: "Produto já está reservado", data: {} });
    }

    // valida reservedUntil (se enviado)
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

    product.reservedBy = req.user.id;
    product.reservedUntil = until || null;

    await product.save();

    return res.status(200).json({
      error: false,
      message: "Produto reservado com sucesso",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Erro ao reservar produto", data: {} });
  }
};

const unreserveProduct = async (req, res) => {
  try {
    if (!requireAuth(req, res)) return;

    const { id } = req.params;
    if (!isObjectId(id)) {
      return res
        .status(400)
        .json({ error: true, message: "ID do produto inválido", data: {} });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ error: true, message: "Produto não encontrado", data: {} });
    }

    const isReserver =
      product.reservedBy?.toString() === req.user.id?.toString();

    if (!(isOwner(product, req.user.id) || isReserver || isAdmin(req.user))) {
      return res.status(403).json({
        error: true,
        message: "Sem permissão para remover a reserva",
        data: {},
      });
    }

    product.reservedBy = null;
    product.reservedUntil = null;
    await product.save();

    return res.status(200).json({
      error: false,
      message: "Reserva removida com sucesso",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Erro ao remover reserva", data: {} });
  }
};

const deleteProduct = async (req, res) => {
  try {
    //preciso ver como o mario as autorização pra fazere o delete
  } catch {}
};

module.exports = {
  getProductId,
  productSearch,
  productCreate,
  productUpdate,
  listProducts,
  getProductsByCategory,
  getProductsBySubcategory,
  reserveProduct,
  unreserveProduct,
  deleteProduct,
};
