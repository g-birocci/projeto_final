const mongoose = require('mongoose')


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
city: {type:String},
district: {type:String},
donationsGiven: {type:Number, default:0},
donationsRecived: {type:Number, default:0}
},
{
    timestamps:true
})

module.exports = mongoose.model('User', userSchema);
