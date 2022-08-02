const mongoose = require('mongoose')

const OrdenSchema = mongoose.Schema({
    UserId:{
        type:String,
        required: false
    }, 
    OrderItem:[{
        id:{type:String,required:false},
        name:{type:String,required:false},
        price:{type:Number,required:false},
        stock:{type:Number, required:false},
        category:{type:String,required:false},
        image:{type:String,required:false}
    }],
    shopingAddres:{
        nombre:{type:String,required:false},
        apellido:{type:String,required:false},
        direccion:{type:String,required:false},
        codigoPostal:{type:Number,required:false},
        ciudad:{type:String,required:false},
        pais:{type:String,required:false},
        telefono:{type:Number,required:false},
    }, 
    numberOfitem:{type:Number, required:false},
    subTotal:{type:Number, required:false},
    tax:{type:Number, required:false},
    total:{type:Number, required:false},
    isPaid:{type:Boolean,default:false,required:false},
    paiAt:{type:String},
    paypalId:{type:String,required:false}


}, 
{timestamps:false}

)

const Orden = mongoose.model("Orden_compra", OrdenSchema)

module.exports = {Orden}
