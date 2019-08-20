const express = require("express");
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

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

      // await generateJwtToken(payload, jwtSecret);

      await jwt.sign(
        payload, // pass the id in the payload
        jwtSecret,
        { expiresIn: 36000 }, //expires in minutes
        (err, token) => {
          //!err ? res.json({ token }) : res.json(err);
          if (err) throw err;
          console.log("token::" + token);
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("server error..");
    }
  }
);
/*
@route GET   api/users/all
@desc       GET all users 
@access      public
*/

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.send("No users found");
    }
    return res.json(users);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
});

/*
@route  GET   api/user/:user_id
@desc      GET user by passing id ni ther url
@access      public
*/
router.get("/:user_id", async (req, res) => {
  try {
    console.log("params.user_id::" + req.params.user_id);
    const user = await User.findOne(req.params.id);
    console.log("User found :: " + user);
    if (!user) {
      return res.status(400).send(" user  not found");
    }
    return res.json({ user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
});

/*
@route  DELETE   api/users/:user_id
@desc       Delete user by passing id ni ther url
@access      private
*/

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    console.log("User Id:: " + req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.send(" user  not found");
    }
    await User.findOneAndDelete({ _id: req.params.id }, (err, query) => {
      if (err) {
        return console.log("error::".err);
      }
      console.log("query::".query);
      return res.json({ msg: "User deleted " });
    });
    // console.log(user.email + " ID::");
  } catch (error) {
    console.log("error::" + error.message);
    return res.status(500).json(error.message);
  }
});

module.exports = router;
