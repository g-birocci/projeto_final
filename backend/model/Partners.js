import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['albergue', 'comida', 'ong', 'dica', 'curso', 'evento']
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  openingHours: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Partner', partnerSchema);