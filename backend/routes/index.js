const express = require('express');
const { userLogin, userCreate, userUpdate, userDelete, getUserById, getMe, logout } = require('../contoller/userController');
const { requireAuth } = require('../middlware/auth');
// Importa todos os handlers de produtos necessários
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
} = require('../contoller/productsController');
const {
  listCategories,
  getCategoryById,
  listSubcategories,
  getSubcategoryById,
  createCategory,
  createSubcategory,
} = require('../contoller/categoriesController');

// Middleware para validar ObjectId
const requireObjectId = (paramName) => (req, res, next) => {
  const value = req.params[paramName];
  if (!/^[a-fA-F0-9]{24}$/.test(String(value))) {
    return res.status(400).json({ error: true, message: `ID do parâmetro ${paramName} inválido`, data: {} });
  }
  next();
};

const route = express.Router();

route.get('/health', async(req, res) => {
    try {
        res.status(200).json({
            message: 'Rota funcionando',
            error:false,
            data: {nome:'Grupo 1'}
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Erro',
            error:true,
            data: {}
        })
    }
}
 )

// ================ Rotas do Usuário ===============
route.get('/user/:id', requireObjectId('id'), getUserById)
route.get('/me', requireAuth, getMe)

route.post('/login', userLogin)
route.post('/logout', logout)

route.post('/user', userCreate)
route.put('/user/:id', requireAuth, requireObjectId('id'), userUpdate)
route.delete('/user/:id', requireAuth, requireObjectId('id'), userDelete)

// ================ Rotas do Item ===============

// Listagem, busca e filtros
route.get('/products', listProducts);

// CRUD normal de produtos
route.get('/products/:id', requireObjectId('id'), getProductId);
route.post('/product', requireAuth, uploadImages, productCreate);
route.patch('/products/:id', requireAuth, requireObjectId('id'), productUpdate);
route.delete('/products/:id', requireAuth, requireObjectId('id'), deleteProduct);

// Reserva de produtos
route.post('/products/:id/reserve', requireAuth, requireObjectId('id'), reserveProduct);
route.post('/products/:id/unreserve', requireAuth, requireObjectId('id'), unreserveProduct);

// Doação de produtos
route.post('/products/:id/donate', requireAuth, requireObjectId('id'), donateProduct);

// ================ Rotas de Categorias ===============
route.get('/categories', listCategories);
route.get('/categories/:id', requireObjectId('id'), getCategoryById);
route.post('/categories', requireAuth, createCategory); // Admin only (futuro)

// ================ Rotas de Subcategorias ===============
route.get('/subcategories', listSubcategories);
route.get('/subcategories/:id', requireObjectId('id'), getSubcategoryById);
route.post('/subcategories', createSubcategory); // Admin only (futuro)


module.exports = route;

