const express = require("express");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

/*
@route GET  api/auth
@desc        auth user
@access      public
*/
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

/*
@route POST  api/auth
@desc        auth user
@access      public
*/

router.post(
  "/",
  [
    check("email", "Email is required").exists(),
    check("email", "please add a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    console.log(" Email :::" + req.body.email);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Errors :" + JSON.stringify(errors.array()));
      return res.status(400).json({ errors: errors.array() });
    }

    const { password, email } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User not found." });
      }
      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        return res.status(400).json({ msg: "Password is not matched " });
      }
      // create JWT token
      const payload = {
        id: user.id
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          console.log(token);
          res.json({ token, user });
        }
      );
    } catch (error) {
      return res.json({ msg: error.message });
    }
  }
);
module.exports = router;
