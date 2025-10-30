const validateReq = (firstName, lastName, password, email, city, district) => {
  const requied = (field, label) =>
    !field || (typeof field === "string" && field.trim() === "")
      ? `${label} é obrigatório`
      : null; //verefico se todos campos estão completos e se os campos está com espaço e não string ou numeros

  const errors = [
    requied(firstName, "O primeiro nome"),
    requied(lastName, "O apelido"),
    requied(email, "O email"),
    requied(password, "A senha"),
    requied(city, "A cidade"),
    requied(district, "O bairo"),
  ].filter(Boolean);

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase())) {
    errors.push("O email informado é inválido");
  }

  if (password && password.length < 6) {
    errors.push("A senha tem que ter pelo menos 6 caracteres");
  }

  if (password && !/[A-Z]/.test(password)) {
    errors.push("A senha deve ter letras maiúscula");
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
