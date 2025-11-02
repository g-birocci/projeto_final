const API_URL = "http://localhost:3000/api";


export async function uploadImagesToCloudinary(files) {
  if (!files || files.length === 0) return [];

  const formData = new FormData();
  files.forEach(file => formData.append("images", file));

  const res = await fetch(`${API_URL}/upload/images`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ao enviar imagens: ${text}`);
  }

  const data = await res.json();
  return data.urls || [];
}



export async function createUser()
{
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Resposta do backend:", data);

    if (!res.ok) throw new Error(data.message || "Erro ao registrar");
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
};




export async function loginService(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro no login");
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

export async function fetchProducts(query = {}) {
  const params = new URLSearchParams(query).toString();
  const response = await fetch(`${API_URL}/products?${params}`, {
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  console.log("Dados do back", data)
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
    

    const res = await fetch(`${API_URL}/product`, {
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
