const mongoose = require("mongoose");
const Category = require("../model/Category");
const Subcategory = require("../model/Subcategory");
const slugify = require("slugify");

// Helpers
const isObjectId = (val) => mongoose.Types.ObjectId.isValid(String(val));

// ===================== LISTAR CATEGORIAS =====================
const listCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      error: false,
      message: "Categorias encontradas",
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Erro ao buscar categorias", data: [] });
  }
};

// ===================== BUSCAR CATEGORIA POR ID =====================
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isObjectId(id)) {
      return res.status(400).json({ error: true, message: "ID inválido", data: {} });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: true, message: "Categoria não encontrada", data: {} });
    }

    res.status(200).json({
      error: false,
      message: "Categoria encontrada",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Erro ao buscar categoria", data: {} });
  }
};

// ===================== LISTAR SUBCATEGORIAS =====================
const listSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.query;

    const filter = {};
    if (categoryId && isObjectId(categoryId)) {
      filter.categoryId = categoryId;
    }

    const subcategories = await Subcategory.find(filter)
      .populate("categoryId", "name slug")
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      error: false,
      message: "Subcategorias encontradas",
      data: subcategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Erro ao buscar subcategorias", data: [] });
  }
};

// ============== BUSCAR SUBCATEGORIA POR ID =====================
const getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isObjectId(id)) {
      return res.status(400).json({ error: true, message: "ID inválido", data: {} });
    }

    const subcategory = await Subcategory.findById(id).populate("categoryId", "name slug");

    if (!subcategory) {
      return res.status(404).json({ error: true, message: "Subcategoria não encontrada", data: {} });
    }

    res.status(200).json({
      error: false,
      message: "Subcategoria encontrada",
      data: subcategory || {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Erro ao buscar subcategoria", data: {} });
  }
};

// ===================== CRIAR CATEGORIA (Admin) =====================
const createCategory = async (req, res) => {
  try {
    const { name, order = 0 } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        error: true,
        message: "Nome da categoria é obrigatório",
        data: {},
      });
    }

    const slug = slugify(name, { lower: true, strict: true });

    // Verificar se slug já existe
    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(409).json({
        error: true,
        message: "Categoria com este nome já existe",
        data: {},
      });
    }

    const category = await Category.create({
      name: name.trim(),
      slug,
      order: parseInt(order) || 0,
    });

    res.status(201).json({
      error: false,
      message: "Categoria criada com sucesso",
      data: category,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).json({
        error: true,
        message: "Categoria já existe",
        data: {},
      });
    }
    res.status(500).json({ error: true, message: "Erro ao criar categoria", data: {} });
  }
};

// ===================== CRIAR SUBCATEGORIA (Admin) =====================
const createSubcategory = async (req, res) => {
  try {
    const { name, categoryId, order = 0 } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        error: true,
        message: "Nome da subcategoria é obrigatório",
        data: {},
      });
    }

    if (!categoryId || !isObjectId(categoryId)) {
      return res.status(400).json({
        error: true,
        message: "ID da categoria é obrigatório e deve ser válido",
        data: {},
      });
    }

    // Verificar se categoria existe
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        error: true,
        message: "Categoria não encontrada",
        data: {},
      });
    }

    const slug = slugify(name, { lower: true, strict: true });

    // Verificar se slug já existe
    const existing = await Subcategory.findOne({ slug });
    if (existing) {
      return res.status(409).json({
        error: true,
        message: "Subcategoria com este nome já existe",
        data: {},
      });
    }

    const subcategory = await Subcategory.create({
      name: name.trim(),
      slug,
      categoryId,
      order: parseInt(order) || 0,
    });

    const populated = await Subcategory.findById(subcategory._id).populate("categoryId", "name slug");

    res.status(201).json({
      error: false,
      message: "Subcategoria criada com sucesso",
      data: populated,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).json({
        error: true,
        message: "Subcategoria já existe",
        data: {},
      });
    }
    res.status(500).json({ error: true, message: "Erro ao criar subcategoria", data: {} });
  }
};

// ===================== EXPORT =====================
module.exports = {
  listCategories,
  getCategoryById,
  listSubcategories,
  getSubcategoryById,
  createCategory,
  createSubcategory,
};

