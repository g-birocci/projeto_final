// Base da API: usa env em produção e fallback para o prefixo local
// Mantém mesmas-origens em dev para evitar CORS e envia cookies httpOnly
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";


// OBS: Rota /upload/images não existe no backend atual.
// Para uploads, use o endpoint de criação/edição de produto com FormData e campo "images".
// Mantemos esta função desativada para evitar chamadas inconsistentes.
// export async function uploadImagesToCloudinary(files) { /* desativado */ }



// Registro de usuário no backend (/api/user)
export async function createUser(payload) {
  const res = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erro ao registrar");
  return data;
}


export async function loginService(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    const isCredentialError = [400, 401, 403, 404].includes(response.status);
    const msg = isCredentialError
      ? "Usuário ou senha incorretos"
      : (data && data.message) || "Erro no login";
    const err = new Error(msg);
    err.status = response.status;
    throw err;
  }

  return data;
}

export async function logoutService() {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Erro ao fazer logout");
  }

  return true;
}

export async function getUser() {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro ao buscar usuário");
  }

  return data;
}

export async function getUserById(id) {
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro ao buscar usuário");
  }

  return data;
}

export async function updateUser(id, payload) {
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro ao atualizar usuário");
  }

  return data;
}

export async function fetchProducts(query = {}) {
  const params = new URLSearchParams(query).toString();
  const response = await fetch(`${API_URL}/products?${params}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();
  return data;
}

export async function fetchMyProducts() {
  const response = await fetch(`${API_URL}/me`, {
    credentials: "include",
  });
  const userData = await response.json();
  if (!response.ok || !userData.data || !userData.data._id) {
    throw new Error("Erro ao buscar dados do usuário");
  }
  return fetchProducts({ ownerId: userData.data._id });
}

export async function fetchDonationHistory() {
  const response = await fetch(`${API_URL}/products/history/donations`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro ao buscar histórico de doações");
  }
  return data;
}

export async function fetchReservations() {
  const response = await fetch(`${API_URL}/products/history/reservations`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro ao buscar reservas");
  }
  return data;
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_URL}/products/${id}`, { credentials: "include" });
  return res.json();
}

export async function createProduct(data) {
  try {

        // Inspecionar o FormData
        console.log('--- Dados do FormData ---');
        for (let [key, value] of data.entries()) {
          if (value instanceof File) {
            console.log(key, value.name, value.type, value.size);
          } else {
            console.log(key, value);
          }
        }
        console.log('------------------------');
    

    // Backend expõe POST /api/products (plural)
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      credentials: "include",
      body: data,
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      if (res.status === 413) {
        throw new Error("Tamanho da requisição muito grande. Por favor, use imagens menores.");
      }
      const text = await res.text();
      throw new Error(`Erro ${res.status}: ${text.substring(0, 100)}`);
    }
    
    return res.json();
  } catch (error) {
    if (error.message.includes("413") || error.message.includes("Payload")) {
      throw new Error("Tamanho da requisição muito grande. Por favor, use imagens menores ou reduza a quantidade de fotos.");
    }
    throw error;
  }
}


export async function updateProduct(id, data) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function donateProduct(id, receiverId) {
  const res = await fetch(`${API_URL}/products/${id}/donate`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ receiverId }),
  });
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`, { credentials: "include" });
  return res.json();
}

export async function fetchCategoryById(id) {
  const res = await fetch(`${API_URL}/categories/${id}`, { credentials: "include" });
  return res.json();
}

export async function fetchSubcategories(categoryId = null) {
  const url = categoryId 
    ? `${API_URL}/subcategories?categoryId=${categoryId}`
    : `${API_URL}/subcategories`;
  const res = await fetch(url, { credentials: "include" });
  return res.json();
}

export async function fetchSubcategoryById(id) {
  const res = await fetch(`${API_URL}/subcategories/${id}`, { credentials: "include" });
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
}

export async function reserveProduct(id, reservedUntil) {
  const res = await fetch(`${API_URL}/products/${id}/reserve`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reservedUntil }),
  });
  return res.json();
}

export async function unreserveProduct(id) {
  const res = await fetch(`${API_URL}/products/${id}/unreserve`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
}

// ====== Chat (Conversations & Messages) ======
export async function listConversations() {
  const res = await fetch(`${API_URL}/conversations`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erro ao listar conversas");
  return data;
}

export async function createConversation(itemId) {
  const res = await fetch(`${API_URL}/conversations`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId }),
  });
  let data = {};
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const err = new Error((data && data.message) || "Erro ao criar conversa");
    err.status = res.status;
    throw err;
  }
  return data;
}

export async function getMessages(conversationId, { before, limit } = {}) {
  const params = new URLSearchParams();
  if (before) params.set("before", before);
  if (limit) params.set("limit", String(limit));
  const qs = params.toString() ? `?${params.toString()}` : "";

  const res = await fetch(`${API_URL}/conversations/${conversationId}/messages${qs}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erro ao buscar mensagens");
  return data;
}

export async function sendMessage(conversationId, body) {
  const res = await fetch(`${API_URL}/conversations/${conversationId}/messages`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erro ao enviar mensagem");
  return data;
}

export async function markRead(conversationId) {
  const res = await fetch(`${API_URL}/conversations/${conversationId}/read`, {
    method: "PATCH",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erro ao marcar como lida");
  return data;
}
