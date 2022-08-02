const mongoose = require('mongoose')


let peruSchema = mongoose.Schema({
    departamento: String,
    provincia: {
      type: [
        "Mixed"
      ]
    }
  })

const peruModel = mongoose.model("Peru", peruSchema)

module.exports = {peruModel}