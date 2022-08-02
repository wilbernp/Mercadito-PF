const mongoose = require('mongoose')

let adminSchema = mongoose.Schema({
    name:String,
    password:String,
    profile_picture: {
      type: String,
      default:
        "https://i0.wp.com/researchictafrica.net/wp/wp-content/uploads/2016/10/default-profile-pic.jpg?fit=300%2C300&ssl=1",
    }
  })

const adminModel = mongoose.model("Admin", adminSchema)

module.exports = {adminModel}