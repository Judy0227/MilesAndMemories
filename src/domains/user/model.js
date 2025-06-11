const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
    lastName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
  },
  
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false, // prevents password from being returned in queries
  },
  token: {
  type: String,
  default: '',
},

});

const User = mongoose.model("User", UserSchema);

module.exports = User;