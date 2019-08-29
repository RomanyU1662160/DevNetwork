const moongose = require("mongoose");

const UserSchema = new moongose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
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
  avatar: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserSchema;
