const mongoose = require('mongoose')


let colombiaSchema = mongoose.Schema({
    id: Number,
    departamento: String,
    ciudades: {
      type: [
        String
      ]
    }
  })

const colombiaModel = mongoose.model("Colombia", colombiaSchema)

module.exports = {colombiaModel}