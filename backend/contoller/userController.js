const User = require("../model/User");
<<<<<<< Updated upstream
=======
const Validator = require("../validators/user.validator")
const jwt = require('jsonwebtoken')

>>>>>>> Stashed changes

User.init()
  .then(() => console.log("Índices criados com sucesso"))
  .catch((err) => console.error("Erro ao criar índices:", err));

const genToken = (id) => {
  const secret = process.env.JWT_SECRET;
  if(!secret)
    {
      throw new Error("Chave não definifa");
    }  

    return jwt.sign({id}, secret, {
      expiresIn: '1d'
    })
};



const getUserById = async (req, res) => {
  try {
    res.status(200).json({
      message: "Rota funcionando",
      error: false,
      data: { nome: "Mario" },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro",
      error: true,
      data: {},
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

    // Verifica se enviou os campos
    if (!email || !password) {
      return res.status(400).json({
        message: "Email e senha são obrigatórios",
        error: true,
        data: {},
      });
    }

    // Procura usuário pelo email
    const user = await User.findOne({ where: { email } }); 

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
        error: true,
        data: {},
      });
    }

    // Verifica se a senha confere
    if (user.password !== password) {
      return res.status(401).json({
        message: "Senha incorreta",
        error: true,
        data: {},
      });
    }

    const token = genToken(user.id)

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      samesite: 'lax',
      path:'/'
    })

    res.status(200).json({
      message: "Login realizado com sucesso",
      error: false,
      data: {
        id: user.id,
        firstName: user.firstName,
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
// Já está pronto =====================================================================
const userCreate = async (req, res) => {
  try {
    const { firstName, lastName, password, city, email, district } = req.body;

    if (!firstName || !lastName || !password || !email || !city || !district) {
      return res.status(400).json("Boom, errou");
    }
    const user = await User.create({
      firtName: firstName,
      lastName: lastName,
      email: email,
      password: password,
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

module.exports = { userCreate, userDelete, userLogin, userUpdate, getUserById };
