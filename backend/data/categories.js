const mongoose = require('mongoose');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

const data = [
  { name: "Eletrónicos", slug: "eletronicos", sub: [
    { name: "Telemóveis", slug: "telemoveis" },
    { name: "Computadores", slug: "computadores" },
    { name: "Consolas e Jogos", slug: "consolas-jogos" },
    { name: "TV e Som", slug: "tv-som" },
  ]},
  { name: "Móveis", slug: "moveis", sub: [
    { name: "Sala", slug: "sala" },
    { name: "Quarto", slug: "quarto" },
    { name: "Cozinha", slug: "cozinha" },
    { name: "Escritório", slug: "escritorio" },
  ]},
  { name: "Bebé e Criança", slug: "bebe-crianca", sub: [
    { name: "Roupas", slug: "roupas" },
    { name: "Brinquedos", slug: "brinquedos" },
    { name: "Carrinhos e Cadeiras", slug: "carrinhos-cadeiras" },
  ]},
  { name: "Casa e Jardim", slug: "casa-jardim", sub: [
    { name: "Decoração", slug: "decoracao" },
    { name: "Jardim", slug: "jardim" },
    { name: "Utilidades", slug: "utilidades" },
  ]},
  { name: "Moda", slug: "moda", sub: [
    { name: "Roupas", slug: "roupas-moda" },
    { name: "Calçado", slug: "calcado" },
    { name: "Acessórios", slug: "acessorios" },
  ]},
  { name: "Desporto e Lazer", slug: "desporto-lazer", sub: [
    { name: "Fitness", slug: "fitness" },
    { name: "Bicicletas", slug: "bicicletas" },
    { name: "Campismo", slug: "campismo" },
  ]},
  { name: "Outros", slug: "outros", sub: [{ name: "Outro", slug: "outro" }]},
];

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  await Promise.all([Category.deleteMany({}), Subcategory.deleteMany({})]);

  for (const [order, cat] of data.entries()) {
    const c = await Category.create({ name: cat.name, slug: cat.slug, order });
    for (const [subOrder, s] of (cat.sub || []).entries()) {
      await Subcategory.create({ ...s, categoryId: c._id, order: subOrder });
    }
  }

  console.log('✅ Seed de categorias concluído');
  process.exit(0);
})();
