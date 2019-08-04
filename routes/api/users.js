const express = require("express");
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

/*
@route POST  api/users
@desc        Register user
@access      public
*/
router.post(
  "/",
  //1- validation
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "The email field is required")
      .not()
      .isEmpty(),
    check("email", "Please Enter a valid email.").isEmail(),
    check("password", "password must be 6 charcters at least.").isLength({
      min: 6
    })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Errors :" + JSON.stringify(errors.array()));
      return res.status(400).json({ errors: errors.array() });
    }
    //define the variables from body
    const { name, email, password } = req.body;

    //2-see if the user is exist
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user is already exist" }] });
      }

      //3- get Gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        email,
        name,
        password,
        avatar
      });
      console.log("NewEmail ::" + req.body.email);

      //4- Encrypt passowrd
      const salt = await bcrypt.genSalt(10);
      var hashedPassowrd = await bcrypt.hashSync(password, salt);
      newUser.password = hashedPassowrd;

      //save the user to the database
      await newUser.save();

      //5- create  JsonwebToken
      const jwtSecret = config.get("jwtSecret");
      const payload = {
        id: newUser.id
      };

      await jwt.sign(
        payload, // pass the id in the payload
        jwtSecret,
        { expiresIn: 360000 }, //expires in minutes
        (err, token) => {
          //!err ? res.json({ token }) : res.json(err);
          if (err) throw err;
          res.json({ token });
          // res.send(token);
        }
      );
      //await res.send(token);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("server error..");
    }
  }
);

module.exports = router;
