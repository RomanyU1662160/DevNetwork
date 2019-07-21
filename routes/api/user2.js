const express = require("express");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/user");
const router = express.Router();

router.get(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(JSON.stringify(errors.array()));
      return res.status(400).json({ errors: errors.array() });
    }
    const name = req.body.name;

    try {
      let checkedUser = await User.findOne({ name });
      if (checkedUser) {
        res.status(400).json({ errors: [{ msg: "user is already exist" }] });
      }
      // see if the user is exist

      res.send("This is User2 pages...");
    } catch (error) {
      console.log(error);
      res.send(500).send("server Error...");
    }
  }
);

module.exports = router;
