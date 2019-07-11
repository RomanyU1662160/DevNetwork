const mongoose = require("mongoose");
const userSchema = require("/migrations/Userschema");

const User = mongoose.model("user", userSchema);

module.exports = User;
