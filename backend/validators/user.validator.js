const validateReq = (firstName, lastName, password, city, email, district) => {
  const requied = (field, label) =>
  {
    return !field || (typeof field === "string" && field.trim() === "")
      ? `${label} é obrigatório`
      : null;
  }

  const errors = [
    requied(firstName, "O primeiro nome"),
    requied(lastName, "O apelido"),
    requied(email, "O email"),
    requied(password, "A senha"),
    requied(city, "A cidade"),
    requied(district, "O bairo"),
  ].filter(Boolean);

  if (email) {
    const normalizedEmail = String(email).trim().toLowerCase();
    console.log("EMAIL RECEBIDO:", JSON.stringify(email));
    console.log("EMAIL NORMALIZADO:", JSON.stringify(normalizedEmail));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      errors.push("O email informado é inválido");
    }
  }
  

  if (password && password.length < 6) {
    errors.push("A senha tem que ter pelo menos 6 caracteres");
  }

  if (password && !/[A-Z]/.test(password)) {
    errors.push('A senha deve ter letras maiúscula');
  }

  if (password && !/[0-9]/.test(password)) {
    errors.push("A senha tem que ter um número");
  }

  if (errors.length > 0) {
    return { validacao: false, errors };
  }

  return { validacao: true };
};

module.exports = { validateReq };
