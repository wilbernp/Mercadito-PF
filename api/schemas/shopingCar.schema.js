const mongoose = require('mongoose')

let productSchema = mongoose.Schema({
    name: String,
    cantidad: {
        type: Number,
        default: 1
    },
    stock: Number,
    price: Number
},{ timestamps: true })

let shopingCarSchema = mongoose.Schema({
    products: [productSchema],
    user: {
        nombre: String,
        apellido: String,
        direccion: String,
        codigoPostal: String,
        ciudad: String,
        pais: String,
        telefono: String
    }
}, { timestamps: true })

const shopingCarModel = mongoose.model("ShopingCar", shopingCarSchema)

module.exports = { shopingCarModel }