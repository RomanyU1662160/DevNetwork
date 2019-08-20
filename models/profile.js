const mongoos = require("mongoose");
const profileSchema = require("../migrations/profileSchema");

const Profile = mongoos.model("profile", profileSchema);

module.exports = Profile;
