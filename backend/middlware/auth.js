const jwt = require('jsonwebtoken');
const User = require('../model/User');

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.auth;

    if (!token) {
      return res.status(401).json({ 
        error: true, 
        message: "Não autenticado. Token não encontrado", 
        data: {} 
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ 
        error: true, 
        message: "Configuração do servidor inválida", 
        data: {} 
      });
    }

    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ 
        error: true, 
        message: "Usuário não encontrado", 
        data: {} 
      });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    console.error("Erro na autenticação:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: true, 
        message: "Token inválido", 
        data: {} 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: true, 
        message: "Token expirado", 
        data: {} 
      });
    }

    return res.status(500).json({ 
      error: true, 
      message: "Erro ao autenticar", 
      data: {} 
    });
  }
};

module.exports = { requireAuth };
