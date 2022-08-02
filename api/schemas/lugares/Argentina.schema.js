const mongoose = require('mongoose')


let ArgentinaSchema = mongoose.Schema({
    provincia: String,
    municipios: {
      type: [
        String
      ]
    }
  })

const ArgentinaModel = mongoose.model("Argentina", ArgentinaSchema)

module.exports = {ArgentinaModel}