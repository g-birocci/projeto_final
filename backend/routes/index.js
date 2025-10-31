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

 // ================ Inicio Rotas de Autenticação ===============

// ================ Fim Rotas do Autenticação ===============


 // ================ Inicio Rotas de Doação ===============

// ================ Fim Rotas do Doção ===============


// ================ Inicio Rotas do Usuário ===============
route.get('/user/:id', getUserById)
route.post('/login', userLogin)
route.post('/user', userCreate)
route.put('/user/:id', userUpdate)
<<<<<<< HEAD
<<<<<<< Updated upstream
route.delete('/', userDelete)
=======
route.delete('/user/:id', userDelete)
// ================ Fim Rotas do Usuário ===============
>>>>>>> Stashed changes
=======
route.delete('/user/:id', userDelete)
>>>>>>> main


<<<<<<< HEAD
<<<<<<< Updated upstream
=======
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

>>>>>>> main
// ================ Rotas do Usuário ===============
=======
// ================ Inicio Rotas do Produto ===============
route.post('/product', requireAuth, productCreate); // Testado OK
route.patch('/product/:id', requireAuth, requireObjectId('id'), productUpdate);
route.get('/products', listProducts)
route.get('/product/search', productSearch);
route.get('/product/:id', requireObjectId('id'), getProductId);
// == Filtro de ptodutos
route.get('/products/category/:categoryId', requireObjectId('categoryId'), getProductsByCategory);
route.get('/products/subcategory/:subcategoryId', requireObjectId('subcategoryId'), getProductsBySubcategory);
route.post('/products/:id/reserve', requireAuth, requireObjectId('id'), reserveProduct);
route.post('/products/:id/unreserve', requireAuth, requireObjectId('id'), unreserveProduct);
// ================ Fim Rotas do Produto ===============

>>>>>>> Stashed changes

module.exports = route;
