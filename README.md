## EcoDoa — Projeto Final

Aplicação web para doação e reserva de produtos com chat em tempo real. O projeto combina Next.js (Pages Router) com um servidor Express integrado, banco MongoDB e Socket.IO para mensagens.

### Principais Funcionalidades
- Autenticação com cookies httpOnly (JWT) e proteção de rotas no backend.
- CRUD de produtos com upload de imagens (Multer + Cloudinary, até 4 fotos).
- Filtros/listagem, histórico de doações e reservas do usuário.
- Chat por produto entre doador e interessado (Socket.IO) com rooms e marcação de lidas.
- Layout “mobile‑first” sob `/app`, com Navbar/Hamburger e toasts de feedback.

### Stack
- Frontend: Next.js 16 (Pages Router), React 19, Tailwind CSS 4, Leaflet.
- Backend: Express 5 + Mongoose 8, Socket.IO 4, Multer, Cloudinary.
- Banco: MongoDB Atlas (ou local), via `mongoose`.

### Estrutura de Pastas (resumo)
- `server.js` — integra Next + Express + Socket.IO e monta as rotas em `/api`.
- `backend/routes/index.js` — todas as rotas REST (auth, usuários, produtos, categorias, subcategorias, chat).
- `backend/contoller/*` — controladores (auth/user/products/chat).
- `backend/model/*` — schemas Mongoose (User, Products, Conversation, Message...).
- `src/pages/app/*` — páginas da aplicação (login/registro, produtos, chat, perfil etc.).
- `src/services/api.js` — client HTTP centralizado (fetch com `credentials: include`).
- `src/context/authContext.js` — contexto de autenticação no cliente.
- `src/components/ui/Toast.jsx` e `src/lib/toast.js` — sistema simples de toasts.

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz com:

```
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=um-segredo-seguro
CLIENT_URL=http://localhost:3000

# Cloudinary (upload de imagens)
CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx

# Opcional no cliente (por padrão usamos "/api")
NEXT_PUBLIC_API_URL=/api
```

Observações:
- O servidor usa `CLIENT_URL` no CORS e lê o cookie `auth` (httpOnly) para autenticar.
- `NEXT_PUBLIC_API_URL` é opcional: em dev o frontend chama `"/api"` (proxy no mesmo host).

### Executando em Desenvolvimento

1) Instale dependências
```
npm install
```

2) Rode o servidor Next + Express com Nodemon
```
npm run dev
```

3) Acesse
```
http://localhost:3000
```

### Build e Produção

```
npm run build
npm run start
```

O comando `start` sobe `server.js` em modo produção (Next renderiza via build). Certifique‑se de que as variáveis de ambiente estejam configuradas no ambiente alvo.

### Endpoints Principais (prefixo `/api`)
- Auth: `POST /login`, `POST /logout`, `GET /me`, `POST /forgot-password`, `PATCH /reset-password`.
- Usuários: `POST /user`, `GET /user/:id`, `PUT /user/:id`, `DELETE /user/:id`.
- Produtos: `GET /products`, `GET /products/:id`, `POST /products`, `PATCH /products/:id`, `DELETE /products/:id`.
- Reserva/Doação: `POST /products/:id/reserve`, `POST /products/:id/unreserve`, `POST /products/:id/donate`.
- Categorias/Subcategorias: `GET /categories`, `GET /categories/:id`, `GET /subcategories`, `GET /subcategories/:id`, `POST /categories`, `POST /subcategories`.
- Chat: `POST /conversations`, `GET /conversations`, `GET /conversations/:id/messages`, `POST /conversations/:id/messages`, `PATCH /conversations/:id/read`.

### Decisões Notáveis
- Servidor único (Next + API + Socket.IO) para simplificar CORS/cookies em dev.
- Cookies httpOnly com nome `auth` e verificação no middleware `backend/middlware/auth.js`.
- Conversas indexadas por `itemId` + participantes; criação idempotente para evitar duplicidade.
- Upload de imagens via `FormData` (campo `images`) com limite de 4 fotos.

### Scripts
- `npm run dev` — inicia Next + Express via Nodemon.
- `npm run build` — build de produção do Next.
- `npm run start` — inicia o servidor em produção.
- `npm run server` — alias para rodar só `server.js` com Nodemon.

### Licença
Projeto acadêmico/demonstrativo. Ajuste conforme necessidade do seu curso/organização.
