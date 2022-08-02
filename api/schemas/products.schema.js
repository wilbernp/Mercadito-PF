const mongoose = require('mongoose')

let productSchema = mongoose.Schema({
    id:String,
    name:String,
    seller:String,
    price:Number,
    stock:Number,
    sales:Number,
    category:String,
    description:String,
    image:String,
    almacenamiento:String,
    ram:Number,
    marca:String,
    modelo:String,
    bateria:Number,
    type:String,
    frecuencia:String,
    resolucion:String,
    duracion_bateria:Number,
    potencia:Number,
    litros:Number,
    RPM:Number,
    capacidad_de_lavado:String,
    tipo:Number,
    procesador:{
        marca:String,
        linea:String,
        nucleos:Number,
        velocidad:String
    },
    
},  { timestamps: true })

const productModel = mongoose.model("Product", productSchema)

module.exports = {productModel, productSchema}