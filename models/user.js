const mongoose = require("mongoose");
const userSchema = require("../migrations/userSchema");

const User = mongoose.model("user", userSchema);

module.exports = User;
