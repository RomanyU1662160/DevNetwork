const express = require("express");
const auth = require("../../middleware/auth");

const User = require("../../models/user");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");
    return res.json({ user });
    // res.send("Welcome to the Auth page.");
  } catch (error) {
    console.log(error);
    res.status(501).json({ msg: "Server error " });
  }
});

module.exports = router;
