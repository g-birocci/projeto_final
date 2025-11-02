# PLANO DE AÇÃO - ANÁLISE DE FUNCIONALIDADES

## 📋 RESUMO EXECUTIVO

Este documento identifica as funcionalidades existentes, incompletas e faltantes no projeto **Bytes4Future**, uma plataforma de doações de produtos.

---

## ✅ FUNCIONALIDADES IMPLEMENTADAS E FUNCIONAIS

### Backend - Usuários
- ✅ **Login** (`POST /login`) - Implementado (mas senha em texto plano)
- ✅ **Criação de usuário** (`POST /user`) - Implementado com validação
- ✅ **Atualização de usuário** (`PUT /user/:id`) - Implementado
- ✅ **Deleção de usuário** (`DELETE /user/:id`) - Implementado
- ✅ **Buscar usuário por ID** (`GET /user/:id`) - Parcialmente implementado (retorna dados mockados)
- ✅ **GetMe** (`GET /me`) - Implementado e funcional

### Backend - Produtos
- ✅ **Listagem de produtos** (`GET /products`) - Implementado com filtros e paginação
- ✅ **Buscar produto por ID** (`GET /products/:id`) - Implementado
- ✅ **Criar produto** (`POST /products`) - Implementado
- ✅ **Atualizar produto** (`PATCH /products/:id`) - Implementado com verificação de permissão
- ✅ **Deletar produto** (`DELETE /products/:id`) - Implementado com verificação de permissão

### Frontend
- ✅ **Context de Autenticação** - Implementado
- ✅ **Hook useProducts** - Implementado
- ✅ **Página de produtos** - Implementada (básica)
- ✅ **Modal de doação** - Componente criado
- ✅ **Service API** - Parcialmente implementado

---

## ⚠️ FUNCIONALIDADES INCOMPLETAS OU COM BUGS

### 🔴 CRÍTICAS - Requerem Ação Imediata

#### 1. **Autenticação e Segurança**
- ❌ **Middleware de autenticação** - Existe stub que apenas chama `next()`, não autentica realmente
- ❌ **Senha em texto plano** - Senhas armazenadas e comparadas sem hash (CRÍTICO de segurança)
- ❌ **Logout incorreto** - Rota `/logout` usa `userLogin` em vez de `logout`
- ❌ **Middleware requireAuth** - Não valida token JWT, apenas passa adiante

#### 2. **Controller de Usuários - Bugs**
- ❌ **getUserById** - Usa `res.params` em vez de `req.params` (bug fatal)
- ❌ **getUserById** - Retorna dados mockados em vez de buscar do banco

#### 3. **Reserva de Produtos**
- ⚠️ **Modelo preparado** - `reservedBy`, `reservedUntil` existem no modelo
- ⚠️ **Frontend preparado** - Funções `reserveProduct` e `unreserveProduct` existem
- ❌ **Rotas não existem** - Não há `POST /products/:id/reserve` nem `POST /products/:id/unreserve`
- ❌ **Controllers não existem** - Funções não exportadas no productsController

#### 4. **Doação de Produtos**
- ⚠️ **Modelo Donation existe** - Mas não é usado pelo sistema
- ⚠️ **Modelo Product tem `donatedTo`** - Campo existe mas não é gerenciado
- ⚠️ **Frontend tem `criarDoacao`** - Função incompleta com URL incorreta
- ❌ **Rotas não existem** - Não há endpoints para doações
- ❌ **Controller não existe** - Não há lógica de doação

#### 5. **Validação de IDs**
- ⚠️ **Middleware `requireObjectId`** - Existe mas só usado em algumas rotas
- ❌ **Validação inconsistente** - Alguns endpoints não validam ObjectId

---

## ❌ FUNCIONALIDADES AUSENTES

### Backend

#### 1. **Categorias e Subcategorias**
- ❌ **Listar categorias** (`GET /categories`)
- ❌ **Listar subcategorias** (`GET /subcategories` ou `GET /categories/:id/subcategories`)
- ❌ **Criar categoria** (admin) (`POST /categories`)
- ❌ **Criar subcategoria** (admin) (`POST /subcategories`)
- ❌ **Controllers de categorias** - Não existem

#### 2. **Upload de Imagens**
- ❌ **Upload de imagens** (`POST /upload` ou similar)
- ❌ **Armazenamento de imagens** - Não há lógica de upload/armazenamento
- ⚠️ **Frontend espera URLs** - Mas não há como fazer upload

#### 3. **Mensagens/Chat**
- ⚠️ **Modelo Messages existe** - Mas não é usado
- ❌ **Rotas de mensagens** - Não existem
- ❌ **Controller de mensagens** - Não existe
- ⚠️ **Página chat.js existe** - Mas não implementada

#### 4. **Status de Produto**
- ⚠️ **Campo `status` existe** no modelo - `DISPONÍVEL`, `RESERVADO`, `DOADO`, `ARQUIVADO`
- ❌ **Atualização de status** - Não há lógica para atualizar status ao reservar/doar
- ❌ **Sincronização** - Status não sincroniza com `reservedBy`/`donatedTo`

#### 5. **Busca e Filtros Avançados**
- ✅ Filtros básicos existem (categoria, distrito, cidade, condição)
- ❌ **Busca por slug de cidade** - Campo `citySlug` existe mas não é usado na busca
- ❌ **Filtro por status** - Campo existe mas filtro não implementado

#### 6. **Gestão de Produtos do Usuário**
- ❌ **Listar produtos do usuário** (`GET /products?ownerId=...` existe mas poderia ser `GET /user/:id/products`)
- ❌ **Histórico de doações do usuário** - Não existe
- ❌ **Histórico de reservas do usuário** - Não existe

### Frontend

#### 1. **Páginas Principais**
- ⚠️ **Página de detalhes do produto** (`/products/[id]`) - Arquivo vazio
- ⚠️ **Página de perfil** (`/profile`) - Não verificada
- ⚠️ **Página de usuário** (`/usuario`) - Não verificada
- ⚠️ **Página de chat** (`/chat`) - Não implementada
- ⚠️ **Página de detalhes de doação** (`/detalhe_doacao`) - Não verificada

#### 2. **Funcionalidades de UI**
- ❌ **Formulário completo de criação de produto** - Modal existe mas pode precisar de campos adicionais
- ❌ **Sistema de reserva na UI** - Botão/função de reservar produto
- ❌ **Sistema de doação na UI** - Botão/função de confirmar doação
- ❌ **Listagem de categorias** - Seleção de categorias/subcategorias
- ❌ **Upload de imagens** - Interface de upload

#### 3. **Serviços API**
- ❌ **getUser()** - Função vazia
- ❌ **criarDoacao()** - Incompleta (URL incorreta, body não serializado)
- ⚠️ **loginService** - Body mal formatado (JSON.stringify com 2 argumentos)
- ⚠️ **logoutService** - URL incorreta (`/api/auth/logout` em vez de `/api/logout`)

---

## 📊 PRIORIZAÇÃO

### 🔴 PRIORIDADE ALTA (Segurança e Funcionalidade Core)

1. **Implementar autenticação real**
   - Criar middleware que valida JWT dos cookies
   - Substituir stub `requireAuth` por autenticação real
   - Aplicar middleware nas rotas protegidas

2. **Implementar hash de senhas**
   - Usar bcrypt ou similar
   - Atualizar userCreate para hash
   - Atualizar userLogin para verificar hash

3. **Corrigir bugs críticos**
   - Corrigir `getUserById` (req.params em vez de res.params)
   - Corrigir rota `/logout` (usar função `logout`)
   - Implementar `getUserById` real

4. **Implementar reserva de produtos**
   - Criar controllers `reserveProduct` e `unreserveProduct`
   - Adicionar rotas `/products/:id/reserve` e `/products/:id/unreserve`
   - Sincronizar `status` do produto ao reservar

### 🟡 PRIORIDADE MÉDIA (Funcionalidades Importantes)

5. **Implementar sistema de doação**
   - Criar controller de doações
   - Criar rotas de doação
   - Integrar com modelo Donation ou usar `donatedTo` no Product
   - Atualizar status do produto ao doar

6. **Implementar gestão de categorias**
   - Criar controller de categorias
   - Criar rotas para listar categorias/subcategorias
   - Popular banco com categorias iniciais

7. **Sistema de upload de imagens**
   - Implementar rota de upload
   - Configurar armazenamento (local ou cloud)
   - Integrar com criação de produtos

8. **Completar páginas do frontend**
   - Implementar página de detalhes do produto
   - Completar formulários de criação
   - Adicionar funcionalidades de reserva/doação na UI

### 🟢 PRIORIDADE BAIXA (Melhorias e Features Secundárias)

9. **Sistema de mensagens/chat**
   - Implementar controllers e rotas
   - Integrar com websockets se necessário

10. **Filtros e busca avançada**
    - Usar citySlug na busca
    - Adicionar filtro por status
    - Melhorar paginação e ordenação

11. **Gestão de histórico**
    - Histórico de doações
    - Histórico de reservas
    - Dashboard de usuário

12. **Validações e melhorias**
    - Validação consistente de ObjectId em todas as rotas
    - Melhorar tratamento de erros
    - Adicionar logs estruturados

---

## 📝 CHECKLIST DE IMPLEMENTAÇÃO

### Segurança e Autenticação
- [ ] Implementar middleware de autenticação real
- [ ] Implementar hash de senhas (bcrypt)
- [ ] Corrigir rota de logout
- [ ] Aplicar middleware em todas as rotas protegidas
- [ ] Adicionar validação de permissões (owner/admin)

### Bugs Críticos
- [ ] Corrigir `getUserById` (req.params)
- [ ] Implementar `getUserById` real
- [ ] Corrigir `loginService` (body JSON)

### Reserva de Produtos
- [ ] Criar `reserveProduct` controller
- [ ] Criar `unreserveProduct` controller
- [ ] Adicionar rotas de reserva
- [ ] Atualizar status do produto
- [ ] Implementar UI de reserva no frontend

### Doação de Produtos
- [ ] Criar controller de doações
- [ ] Criar rotas de doação
- [ ] Integrar com modelo
- [ ] Atualizar status do produto
- [ ] Implementar UI de doação no frontend
- [ ] Corrigir `criarDoacao` no frontend

### Categorias
- [ ] Criar controller de categorias
- [ ] Criar rotas de categorias
- [ ] Popular categorias iniciais
- [ ] Implementar seleção no frontend

### Upload de Imagens
- [ ] Implementar rota de upload
- [ ] Configurar armazenamento
- [ ] Integrar com criação de produtos
- [ ] Implementar UI de upload

### Frontend
- [ ] Completar página de detalhes do produto
- [ ] Corrigir `getUser()` service
- [ ] Corrigir `logoutService` URL
- [ ] Implementar funcionalidades de reserva/doação na UI
- [ ] Adicionar tratamento de erros

---

## 🔍 OBSERVAÇÕES TÉCNICAS

### Arquitetura
- Backend: Express.js com MongoDB/Mongoose
- Frontend: Next.js (Pages Router)
- Autenticação: JWT em cookies HTTP-only

### Modelos Identificados
- ✅ User
- ✅ Product
- ✅ Category
- ✅ Subcategory
- ⚠️ Donation (existe mas não usado)
- ⚠️ Messages (existe mas não usado)
- ⚠️ Partners (existe mas não usado)

### Padrões Identificados
- Controllers seguem padrão similar
- Respostas seguem formato: `{ message, error, data }`
- Validação de ObjectId implementada em middleware
- Paginação implementada com `page` e `limit`

---

## 📅 ESTIMATIVA DE ESFORÇO

### Implementação Completa
- **Alta Prioridade**: ~2-3 dias de desenvolvimento
- **Média Prioridade**: ~3-4 dias de desenvolvimento
- **Baixa Prioridade**: ~2-3 dias de desenvolvimento

**Total estimado**: ~7-10 dias de desenvolvimento

---

## 🎯 CONCLUSÃO

O projeto possui uma base sólida com funcionalidades core de usuários e produtos implementadas. No entanto, há lacunas críticas de segurança (autenticação real, hash de senhas) e funcionalidades importantes ausentes (reserva, doação, categorias). 

O plano de ação prioriza a correção de bugs críticos e segurança antes de adicionar novas funcionalidades.

---

**Data da Análise**: 2025-11-01
**Versão do Documento**: 1.0

