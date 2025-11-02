// ===== CONSTANTES FIXAS =====
const express = require('express');
const next = require('next');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./backend/config/mongodb');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, turbo: false});
const handle = nextApp.getRequestHandler();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
const rotas = require('./backend/routes/index');

// ===== SOCKET.IO & HTTP SERVER =====
const http = require('http');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

const server = http.createServer(app); // << vamos dar listen neste cara
const io = socketio(server, { cors: { origin: '*' } });

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('no token'));
  try {
    socket.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    next(new Error('invalid token'));
  }
});

io.on('connection', (socket) => {
  console.log('🔌 Novo socket conectado:', socket.user.id);
  socket.on('conv:join', (convId) => socket.join(`conv:${convId}`));
  socket.on('conv:leave', (convId) => socket.leave(`conv:${convId}`));
});

// 🔌 injeta o io ANTES das rotas
app.use((req, _res, next) => { req.io = io; next(); });

// ===== ROTAS DA API =====
const rotas = require('./backend/routes/index');
app.use('/api', rotas);

// ===== NEXT.JS POR ÚLTIMO =====
app.use((req, res) => handle(req, res)); // usar all é mais comum aqui

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await connectDB();
    await nextApp.prepare();
    // ⚠️ importante: escutar o HTTP SERVER, não o app
    server.listen(PORT, () => {
      console.log(`Servidor Next.js + Express + Socket.IO em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();
