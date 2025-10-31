// ===== CONSTANTES FIXAS =====
const express = require('express');
const next = require('next');
const cors = require('cors');
const cookieParser = require('cookie-parser')


require('dotenv').config();
const connectDB = require('./backend/config/mongodb');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json());

const rotas = require('./backend/routes/index');

// ===== INICIALIZAÇÃO DO SERVIDOR (também não se deve mexer)=====
app.use('/api', rotas)


// ===== NEXT.JS DEVE VIR POR ÚLTIMO =====
app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await connectDB();
    await nextApp.prepare();
    app.listen(PORT, () => {
      console.log(`Servidor Next.js + Express a correr em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();
