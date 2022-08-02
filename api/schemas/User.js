const mongoose = require("mongoose");

let UserSchema = mongoose.Schema(
  {
    name: String,
    lastname: String,
    password: String,
    dni: String,
    profile_picture: {
      type: String,
      default:
        "https://i0.wp.com/researchictafrica.net/wp/wp-content/uploads/2016/10/default-profile-pic.jpg?fit=300%2C300&ssl=1",
    },
    email: String,
    phone: String,
    address: String,
    isActive: {
      type: Boolean,
      default: true
  }
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", UserSchema);
