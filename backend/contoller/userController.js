const User = require('../model/User')

User.init().then(() => console.log('Índices criados com sucesso'))
.catch(err => console.error('Erro ao criar índices:', err));


const genToken = () => {}


// const validateReq = (firstName, lastName, password, city, district, error) => {
//     if(!firstName) {
//         return {
//             message: 'O primeiro nome é obrigatorio',
        
//         }
//     }

//     if(!lastName) {

//     }

//     if(!password) {

//     }

//     if(!district) {

//     }
    
// }

const getUserById = async(req, res) => {
    try {
        res.status(200).json({
            message: 'Rota funcionando',
            error:false,
            data: {nome:'Mario'}
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


const userCreate = async (req, res) => {
    try {
        const {firstName, lastName, password, city, email, district} = req.body;

        if(!firstName || !lastName || !password || !email ||!city || !district) {
            return res.status(400).json('Boom, errou')
        }
        const user = await User.create({
            firtName: firstName,
            lastName: lastName,
            email:email,
           password:password,
           city:city,
           district:district 
        })

        // await user.save()
        res.status(200).json({
            message: 'Usuário criado com sucesso',
            error: false,
            data: user
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Perdeu playboy',
            error:true,
            data: {}
        })
    }
}

const userLogin = async(req, res) => {
    try {
        res.status(200).json({
            message: 'Rota funcionando',
            error:false,
            data: {nome:'Mario'}
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

const userUpdate = async(req, res) => {
    try {
        // const {_id} = req.params
        const {firstName, lastName, city, email, district} = req.body;

        
        const updateUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            {
            firstName,
            lastName,
            city,
            district,
            email
        }, {
            new: true
        })

        res.status(200).json({
            message: 'Perfil atualizado',
            error: false,
            data: updateUser
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: error,
            error:true,
            data: {}
        })
    }
}


const userDelete = async(req, res) => {
    try {
        res.status(200).json({
            message: 'Rota funcionando',
            error:false,
            data: {nome:'Mario'}
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

module.exports = {userCreate, userDelete, userLogin, userUpdate, getUserById}
