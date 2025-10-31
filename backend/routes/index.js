const express = require('express');
const { userLogin, userCreate, userUpdate, userDelete, getUserById } = require('../contoller/userController');
// Importa todos os handlers de produtos necessários
const {
  listProducts,
  productSearch,
  getProductsByCategory,
  getProductsBySubcategory,
  getProductId,
  productCreate,
  productUpdate,
  reserveProduct,
  unreserveProduct,
} = require('../contoller/productsController');

// Stubs mínimos para middlewares ausentes
const requireObjectId = (paramName) => (req, res, next) => {
  const value = req.params[paramName];
  if (!/^[a-fA-F0-9]{24}$/.test(String(value))) {
    return res.status(400).json({ error: true, message: `ID do parâmetro ${paramName} inválido`, data: {} });
  }
  next();
};
const requireAuth = (req, res, next) => next();

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
route.get('/user/:id', getUserById)
route.post('/login', userLogin)
route.post('/user', userCreate)
route.put('/user/:id', userUpdate)
route.delete('/user/:id', userDelete)

// ================ Rotas do Item ===============

route.get('/products', listProducts)
route.get('/products/search', productSearch);
route.get('/products/category/:categoryId', requireObjectId('categoryId'), getProductsByCategory);
route.get('/products/subcategory/:subcategoryId', requireObjectId('subcategoryId'), getProductsBySubcategory);
route.get('/products/:id', requireObjectId('id'), getProductId);
route.post('/products', requireAuth, productCreate);

//route.use('/categories', require('./categories'));
route.patch('/products/:id', requireAuth, requireObjectId('id'), productUpdate);
route.post('/products/:id/reserve', requireAuth, requireObjectId('id'), reserveProduct);
route.post('/products/:id/unreserve', requireAuth, requireObjectId('id'), unreserveProduct);

// ================ Rotas do Usuário ===============

module.exports = route;
