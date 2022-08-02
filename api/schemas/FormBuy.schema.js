const mongoose = require('mongoose')
let FormBuy = mongoose.Schema({
    nombre:String,
    apellido:String,
    direccion:String,
    codigoPostal:String,
    ciudad:String,
    pais:String,
    telefono:String
})

const FormBuymodel = mongoose.model("Form_Buy", FormBuy)

module.exports = {FormBuymodel}
