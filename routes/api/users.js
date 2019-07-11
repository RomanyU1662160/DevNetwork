const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();

/*
@route POST  api/users
@desc        Register user
@access      public
*/
router.post(
  "/",
  [
    (check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Must be an Email").isEmail(),
    check("password", "password must be 6 charcters at least.").isLength({
      min: 6
    }))
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    //console.log("Req::" + JSON.stringify(req.body));
    console.log("Req::" + req.body.name);
    res.send("Welcome to the user page....");
  }
);

module.exports = router;
