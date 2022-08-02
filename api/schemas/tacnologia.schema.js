const mongoose = require('mongoose')

let tecnologiaSchema = mongoose.Schema({
    name:String
  })

const tecnologiaModel = mongoose.model("Tecnologia", tecnologiaSchema)

module.exports = {tecnologiaModel}