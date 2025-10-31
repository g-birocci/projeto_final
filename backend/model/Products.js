const mongoose = require('mongoose');

//coloquei essa função para normalizar os dados na base de dados
function slugify(str = "") {
  return str
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // espaços e pontuação -> "-"
    .replace(/^-+|-+$/g, "");
}

const DISTRICTS_PT = [
  "Aveiro","Beja","Braga","Bragança","Castelo Branco","Coimbra","Évora",
  "Faro","Guarda","Leiria","Lisboa","Portalegre","Porto","Santarém",
  "Setúbal","Viana do Castelo","Vila Real","Viseu","Regiões Autónomas"
];

const ProductSchema = new mongoose.Schema({
  title:        { type: String, required: true, trim: true, maxlength: 50 },
  description:  { type: String, trim: true, maxlength: 800 },
  condition:    { type: String, enum: ["NOVO","BOM","USADO","PECAS"], required: true },
  status:       { type: String, enum: ["DISPONÍVEL", "RESERVADO", "DOADO", "ARQUIVADO"], default: "DISPONÍVEL", index: true },
  images: {
    type: [String],
    validate: {
      validator: arr => Array.isArray(arr) && arr.length <= 4,
      message: "Só pode ter no maximo 4 fotos"
    },
    default: []
  },
  district:   { type: String, enum: DISTRICTS_PT, required: true, index: true }, //add isso para que seja usado na hora de fazer os filtros 
  city:       { type: String, required: true, trim: true },
  citySlug:   { type: String, index: true },
  categoryId:     { type: mongoose.Schema.Types.ObjectId, ref: "Category", index: true },//criei dois arquivos no models com a categoria e asub
  subcategoryId:  { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", index: true },

  ownerId:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

  // add que seria a reserva, precisso tirar duvida sobre isso
  reservedBy:     { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  reservedUntil:  { type: Date, default: null },
  donatedTo:      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  
}, {
  timestamps: true
});

// Garantir citySlug sempre sincronizado
ProductSchema.pre("save", function(next) {
  if (this.isModified("city")) {
    this.citySlug = slugify(this.city);
  }
  next();
});

module.exports = mongoose.models.Product || mongoose.model("Product", ProductSchema);
