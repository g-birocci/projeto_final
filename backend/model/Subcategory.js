const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 60 },
  slug: { type: String, required: true, unique: true, index: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

SubcategorySchema.index({ categoryId: 1, order: 1 });

module.exports = mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
