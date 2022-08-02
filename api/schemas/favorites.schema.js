const mongoose = require('mongoose')

let favoritesSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const favoritesModel = mongoose.model("Favorite", favoritesSchema)

module.exports = {favoritesModel}