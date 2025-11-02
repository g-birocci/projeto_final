// ===== CONSTANTES FIXAS =====
const express = require("express");
const Next = require("next"); // evita conflito de nome com o arg "next" de middlewares
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./backend/config/mongodb");

const dev = process.env.NODE_ENV !== "production";
const nextApp = Next({ dev, turbo: false });
const handle = nextApp.getRequestHandler();

const app = express();

// ===== MIDDLEWARES GLOBAIS =====
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";

app.use(cors({ credentials: true, origin: allowedOrigin }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// ===== SOCKET.IO & HTTP SERVER =====
const http = require("http");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");

const server = http.createServer(app); // vamos dar listen neste cara
const io = socketio(server, {
  cors: { origin: allowedOrigin, credentials: true },
});

io.use((socket, next) => {
  try {
    const authFromHandshake = socket.handshake?.auth?.token;
    let token = authFromHandshake;

    if (!token) {
      const cookieHeader = socket.request?.headers?.cookie || "";
      const parts = cookieHeader.split(";").map((p) => p.trim());
      for (const p of parts) {
        if (p.startsWith("auth=")) {
          token = decodeURIComponent(p.substring(5));
          break;
        }
      }
    }

    if (!token) return next(new Error("no token"));

    socket.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return next(new Error("invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log("Novo socket conectado:", socket.user?.id);
  socket.on("conv:join", (convId) => socket.join(`conv:${convId}`));
  socket.on("conv:leave", (convId) => socket.leave(`conv:${convId}`));
});

// 🔌 injeta o io ANTES das rotas
app.use((req, _res, next) => {
  req.io = io;
  next();
});

// ===== ROTAS DA API =====
const rotas = require("./backend/routes/index");
app.use("/api", rotas);

// ===== NEXT.JS POR ÚLTIMO =====
app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await connectDB();
    await nextApp.prepare();
    // ⚠️ importante: escutar o HTTP SERVER, não o app
    server.listen(PORT, () => {
      console.log(
        `Servidor Next.js + Express + Socket.IO em http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
    process.exit(1);
  }
};

iniciarServidor();


