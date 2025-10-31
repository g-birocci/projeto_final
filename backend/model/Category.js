const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 60 },
  slug: { type: String, required: true, unique: true, index: true },
  order: { type: Number, default: 0 } // para ordenar no front
}, { timestamps: true });

module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema);

