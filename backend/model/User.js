const mongoose = require('mongoose')

//add isso pra garantir que as cidades seja add de forma correta pelo user
const distritosPortugal = [
  "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora",
  "Faro", "Guarda", "Leiria", "Lisboa", "Portalegre", "Porto", "Santarém",
  "Setúbal", "Viana do Castelo", "Vila Real", "Viseu", "Regiões Autónomas"
];

const userSchema = new mongoose.Schema({
firtName: {type:String, required:true},
lastName: {type:String, required:true},
email: {
    type: String, 
    required: [true, 'Email é obrigatório'],
    trim: true,
    unique: true,
    maxlength: 100,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
},
password: {type:String, required:true},
city: {
    type: String,
    trim: true,
    required: false
  },
district: {
    type: String,
    enum: distritosPortugal, //eu passei aqui, pra garantir as info certas
    required: false
  },
donationsGiven: {type:Number, default:0},
donationsRecived: {type:Number, default:0}
},
{
    timestamps:true
})

module.exports = mongoose.model('User', userSchema);
