//Modules
const mongoose = require("mongoose");

//Signup Schema
const signupSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 25
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false 
  }
});

//Signup Model
module.exports = mongoose.model("user", signupSchema);
