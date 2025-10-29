const express = require('express');
const { userLogin, userCreate, userUpdate, userDelete, getUserById} = require('../contoller/userController');

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
route.get('/user/:id', getUserById) //ok
route.post('/login', userLogin)
route.post('/user', userCreate) //ok
route.put('/user/:id', userUpdate) //ok
route.delete('/', userDelete) //ok



// ================ Rotas do Item ===============



// ================ Rotas do Usuário ===============

module.exports = route
