// routes/index.js
const express = require("express");
const { requireAuth } = require('../middlware/auth')

// Controllers
const authController = require("../contoller/authController"); // corrige 'contoller' -> 'controller'

// Usuários
const {
  userLogin,
  userCreate,
  userUpdate,
  userDelete,
  getUserById,
  getMe,
  logout,
} = require("../contoller/userController");

// Produtos
const {
  listProducts,
  getProductId,
  productCreate,
  productUpdate,
  deleteProduct,
  reserveProduct,
  unreserveProduct,
  donateProduct,
  uploadImages,
} = require("../contoller/productsController");

// Categorias / Subcategorias
const {
  listCategories,
  getCategoryById,
  listSubcategories,
  getSubcategoryById,
  createCategory,
  createSubcategory,
} = require("../contoller/categoriesController");


// Middleware para validar ObjectId de rota
const requireObjectId = (paramName) => (req, res, next) => {
  const value = req.params[paramName];
  if (!/^[a-fA-F0-9]{24}$/.test(String(value))) {
    return res.status(400).json({
      error: true,
      message: `ID do parâmetro ${paramName} inválido`,
      data: {},
    });
  }
  next();
};

const route = express.Router();

/**
 * Healthcheck
 */
route.get("/health", async (_req, res) => {
  try {
    res.status(200).json({
      message: "Rota funcionando",
      error: false,
      data: { nome: "Grupo 1" },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro", error: true, data: {} });
  }
});

/**
 * ================ Rotas de Autenticação/Conta ===============
 */
route.post("/login", userLogin);
route.post("/logout", requireAuth, logout);
route.post("/forgot-password", authController.forgotPassword);
route.patch("/reset-password", authController.resetPassword);
route.get("/me", requireAuth, getMe);

/**
 * ================ Rotas de Usuário ===============
 */
route.get("/user/:id", requireObjectId("id"), getUserById);
route.post("/user", userCreate);
route.put("/user/:id", requireAuth, requireObjectId("id"), userUpdate);
route.delete("/user/:id", requireAuth, requireObjectId("id"), userDelete);

/**
 * ================ Rotas de Produtos ===============
 */
// Listagem, busca e filtros
route.get("/products", listProducts);

// CRUD de produtos
route.get("/products/:id", requireObjectId("id"), getProductId);
route.post("/products", requireAuth, uploadImages, productCreate); // criação
route.patch("/products/:id", requireAuth, requireObjectId("id"), productUpdate);
route.delete(
  "/products/:id",
  requireAuth,
  requireObjectId("id"),
  deleteProduct
);

// Reserva de produtos
route.post(
  "/products/:id/reserve",
  requireAuth,
  requireObjectId("id"),
  reserveProduct
);
route.post(
  "/products/:id/unreserve",
  requireAuth,
  requireObjectId("id"),
  unreserveProduct
);

// Doação de produtos
route.post(
  "/products/:id/donate",
  requireAuth,
  requireObjectId("id"),
  donateProduct
);

/**
 * ================ Rotas de Categorias ===============
 */
route.get("/categories", listCategories);
route.get("/categories/:id", requireObjectId("id"), getCategoryById);
route.post("/categories", requireAuth, createCategory); // (admin futuramente)

/**
 * ================ Rotas de Subcategorias ===============
 */
route.get("/subcategories", listSubcategories);
route.get("/subcategories/:id", requireObjectId("id"), getSubcategoryById);
route.post("/subcategories", requireAuth, createSubcategory); // (admin futuramente)

/**
 * ================ Rotas de Chat ===============
 */
route.post("/conversations", requireAuth, authController.createConversation);
route.get("/conversations", requireAuth, authController.listConversations);
route.get(
  "/conversations/:id/messages",
  requireAuth,
  requireObjectId("id"),
  authController.getMessages
);
route.post(
  "/conversations/:id/messages",
  requireAuth,
  requireObjectId("id"),
  authController.sendMessage
);
route.patch(
  "/conversations/:id/read",
  requireAuth,
  requireObjectId("id"),
  authController.markAsRead
);

module.exports = route;
