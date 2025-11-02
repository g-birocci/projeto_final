const User = require("../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Validator = require("../validators/user.validator");
User.init()
  .then(() => console.log("Índices criados com sucesso"))
  .catch((err) => console.error("Erro ao criar índices:", err));

const genToken = (data) => {
  const secret = process.env.JWT_SECRET;
  if(!secret)
    return {mesage: 'nenhuma chave fornecida'}

  return jwt.sign(data, secret, {
    expiresIn: '1d'
  })};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Id não fornecido',
        error: true,
        data: {}
      });
    }

    if (!/^[a-fA-F0-9]{24}$/.test(String(id))) {
      return res.status(400).json({
        message: 'ID inválido',
        error: true,
        data: {}
      });
    }
    
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: 'Usuário não encontrado',
        error: true,
        data: {}
      });
    }

    res.status(200).json({
      message: 'Usuário encontrado com sucesso',
      error: false,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erro ao buscar usuário',
      error: true,
      data: {}
    });
  }
};

const userGetId = async(req, res) => {
  try {

    const { id } = res.params;

    if (!id) {
      return res.status(400).json({
        message: 'Id não fornecido',
        error: true,
        data: {}
      });
    }
    
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'Usuário não encontrado',
        error: true,
        data: {}
      });
    }

    res.status(200).json({
      message: 'Usuário encontrado com sucesso',
      error: false,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erro em buscar o usaario',
      error: false,
      data: {}
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Dados no controller: ", req.body)

    // Verifica se enviou os campos
    if (!email || !password) {
      return res.status(400).json({
        message: "Email e senha são obrigatórios",
        error: true,
        data: {},
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
        error: true,
        data: {},
      });
    }

    // Verifica se a senha confere (compatível com senhas antigas em texto plano)
    let passwordMatch = false;
    if (user.password.startsWith('$2b$')) {
      // Senha já está com hash bcrypt
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {
      // Senha antiga em texto plano (migração)
      passwordMatch = user.password === password;
      // Se a senha antiga estiver correta, vamos atualizar para hash
      // Usando updateOne para não validar outros campos que podem ter valores inválidos
      if (passwordMatch) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
          { _id: user._id },
          { password: hashedPassword },
          { runValidators: false }
        );
      }
    }

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email ou senha incorretos",
        error: true,
        data: {},
      });
    }

    const token = genToken({id: user._id.toString()})

    res.cookie("auth", token, {
      httpOnly: true,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login realizado com sucesso",
      error: false,
      data: {
        id: user._id,
        firstName: user.firtName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao realizar login",
      error: true,
      data: {},
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("auth", { path: "/" }); 
  res.status(200).json({
    message: "Logout realizado com sucesso",
    error: false,
    data: {},
  });
};


// Já está pronto =====================================================================
const userCreate = async (req, res) => {
  try {
    const { firstName, lastName, password, city, email, district } = req.body;

    const vali = Validator.validateReq(firstName, lastName, password, city, email, district)
    
    if (!vali.validacao) {
      console.log({
        vali, firstName, lastName, password, city, email, district
      })
      return res.status(400).json({
        message: vali.errors
      }); //chamo a função pra validar os dados
    }

    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      city: city,
      district: district,
    });

    // await user.save()
    res.status(200).json({
      message: "Usuário criado com sucesso",
      error: false,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Perdeu playboy",
      error: true,
      data: {},
    });
  }
};

// já está pronto ======================================================================

const userUpdate = async (req, res) => {
  try {
    // const {_id} = req.params
    const { firstName, lastName, city, email, district } = req.body;

    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        firstName,
        lastName,
        city,
        district,
        email,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Perfil atualizado",
      error: false,
      data: updateUser,
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

// Já está feito ==============================================================================

const userDelete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'O Id é obrigatório',
                error: true
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: 'Usuário não encontrato',
                error: true
            })
        }

// quando foi validado o Id e que realmente o user exixte vai começar o delete

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Sua conta foi deletada com sucesso',
            error: false,
            data: {id},
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erro em deletar sua conta',
            error: true,
        });
    }
};


const getMe = async (req, res) => {
  try {
    // req.user já está disponível pelo middleware requireAuth
    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado", error: true, data: {} });
    }

    res.status(200).json({
      message: "Usuário autenticado",
      error: false,
      data: req.user,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Erro ao buscar usuário", error: true, data: {} });
  }
};


module.exports = { userCreate, logout, getMe, userDelete, userLogin, userUpdate, getUserById, userGetId};
