const mongoose = require('mongoose')

// let categoriesSchema = mongoose.Schema({
//     "tecnologia": {
//       "type": [
//         "Mixed"
//       ]
//     },
//     "electrodomesticos": {
//       "type": [
//         "Mixed"
//       ]
//     },
//     "moda": {
//       "type": [
//         "Mixed"
//       ]
//     }
//   })
let subSchema = mongoose.Schema({
  name:String
})

let categoriesSchema = mongoose.Schema({
  name:String,
  sub:[{name:String}]
})

const categoriesModel = mongoose.model("Categories", categoriesSchema)

module.exports = {categoriesModel}