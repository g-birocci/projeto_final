const jwt = require('jsonwebtoken')
const User = require('../model/User')

const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res) => {
    const token = req.cookies.jwt;

    if(!token)
        return res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.'})
            
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const foundUser = (await User.findById(decoded.id)).isSelected('-password')
        if(!foundUser)
        {
            return res.status('401').json({
                message: 'Não autorizado, usuário não encontrado.',
            })
        }
        req.user = foundUser;
        next();
    } catch (error) {
        console.error(error);
        res.cookie('jwt', '',  {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(400).json({
            message: 'Não autorizado, token inválido.'
        })
    }
}