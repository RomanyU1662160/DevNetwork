const express = require("express");
const auth = require("../../middleware/auth");
const Profile = require("../../models/profile");
const User = require("../../models/user");
const { check, validationResult } = require("express-validator/check");
const config = require("config");
const request = require("request");

const router = express.Router();
/*
@route GET   api/profile
@desc        get proile of logged  user
@access      provate
*/
router.get("/me", auth, async (req, res) => {
  console.log("id::" + req.id);
  try {
    const existProfile = await Profile.findOne({ user: req.id }).populate(
      "User",
      ["name", "avatar"]
    );
    if (!existProfile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });
    }
    return res.json(existProfile);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send("err::" + error);
  }
});

/*
@route POST  api/profile
@desc        Create/Update new profile
@access      private
*/

router.post(
  "/",
  [
    auth,
    [
      check("status", "Please add your current status.")
        .not()
        .isEmpty(),
      check("skills", "Please add your skills.")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      experience,
      education,
      youtube,
      facebook,
      twitter,
      instagram,
      linkdin,
      date
    } = req.body;

    //build the  profile object
    let profile = {
      social: {}
    };

    profile.user = req.id;
    //company ? console.log(company) : console.log("error ");
    company ? (profile.company = company) : (profile.company = null);
    website ? (profile.website = website) : (profile.website = null);
    location ? (profile.location = location) : (profile.location = null);
    status ? (profile.status = status) : (profile.status = null);
    bio ? (profile.bio = bio) : (profile.bio = null);
    githubusername
      ? (profile.githubusername = githubusername)
      : (profile.githubusername = null);
    education ? (profile.education = education) : (profile.education = null);

    youtube
      ? (profile.social.youtube = youtube)
      : (profile.social.youtube = null);
    // console.log(profile.social.youtube);
    facebook
      ? (profile.social.facebook = facebook)
      : (profile.social.facebook = null);
    instagram
      ? (profile.social.instagram = instagram)
      : (profile.social.instagram = null);
    twitter
      ? (profile.social.twitter = twitter)
      : (profile.social.twitter = null);
    linkdin
      ? (profile.social.linkdin = linkdin)
      : (profile.social.linkdin = null);
    date ? (profile.date = date) : (profile.date = null);
    //set the skills to array
    skills
      ? (profile.skills = skills.split(",").map(skill => skill.trim()))
      : (profile.skills = []);
    experience ? (profile.experience = experience) : (profile.experience = []);

    //check if profile is already exist and  update  it
    try {
      let existProfile = await Profile.findOneAndUpdate(
        { user: req.id },
        { $set: profile },
        { new: true, upsert: true }
      );

      console.log("new prfoile created ");

      return res.json(existProfile);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json(error.message);
    }
  }
);

/*
@route get  api/allprofiles
@desc        Get all  profiles
@access      public
*/

router.get("/all", async (req, res) => {
  try {
    let profiles = await Profile.find().populate("user", [
      "name",
      "email",
      "avatar"
    ]);
    if (!profiles) {
      return res.send("Cannot get profiles");
    }
    return res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

/*
@route get  api/profile/user/:id
@desc        Get profile by user id 
@access      public
*/

router.get("/user/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    let profile = await Profile.findOne({ user: user_id }).populate("user", [
      "name",
      "email",
      "avatar"
    ]);
    if (!profile) {
      return res.status(400).json({ msg: "No profile found for this user." });
    }
    return res.json(profile);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(500).json("cannot find profile...not a valid ObjectId");
    }

    console.log(error.message);
    res.status(500).json(error.message);
  }
});
/*
@route Delete  api/profile/delete/:id
@desc        Delete profile by user id 
@access      private
*/

router.delete("/delete/:user_id", async (req, res) => {
  try {
    console.log(req.params.user_id);
    const profile = await Profile.findOne({ user: req.params.user_id });
    if (!profile) {
      return res.status(500).json("Profile is not exist.");
    }
    await Profile.findOneAndDelete({ user: req.params.user_id });

    console.log("FindOneAndDelete done on this profile...");

    console.log("User Id:: " + req.params.user_id);

    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.send(" user Associated with this profile is not found");
    }
    await User.findOneAndDelete({ _id: req.params.user_id });
    console.log("FindOneAndDelete done on the user associated...");
    console.log("User Associated with this profile deleted");

    return res.json({ msg: "profile Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

/*
@route  PUT  api/profile/delete/:id
@desc        Add experience Update profile 
@access      private
*/

router.put(
  "/experience",
  [
    auth,
    check("title", "Please add the title of this experience")
      .not()
      .isEmpty(),
    check("company", "Please add the copmany's name ")
      .not()
      .isEmpty(),
    check("from", "Please add the title of this experience")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.id });
      console.log("req.id::" + profile.user.email);
      if (!profile) {
        return res.status(400).json({ msg: "Profile is not exist" });
      }
      profile.experience.unshift(newExp);
      profile.save();
      return res.json(profile.experience);
    } catch (error) {
      console.log(error.message);
      return res.status(401).json(error.message);
    }
  }
);
/*
@route Delete api/experience/delete/:exp_id
@desc        Delete experience  by experience id 
@access      private
*/
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.id });
    console.log("req.id::" + req.id);
    if (!profile) {
      return res.status(400).json("profile is not exist ");
    }
    if (profile.experience.length >= 0) {
      profile.experience = profile.experience.filter(exp => {
        return exp.id !== req.params.exp_id;
      });
    }
    profile.save();
    return res.json(profile.experience);
  } catch (error) {
    console.log(error.message);
    return res.status(401).json(error.message);
  }
});

/*
@route  PUT  api/profile/education/:id
@desc        Add eduacationand Update profile 
@access      private
*/

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is requried")
        .not()
        .isEmpty(),
      check("fieldofstudy", "fieldofstudy is requried")
        .not()
        .isEmpty(),
      check("from", "from is requried")
        .not()
        .isEmpty(),
      check("to", "to is requried")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.id });
      console.log("req.id::" + profile.social.youtube);
      console.log("Education::" + profile.education);
      if (!profile) {
        return res.status(400).json({ msg: "Profile is not exist" });
      }
      profile.education = [];
      profile.education.push(newEdu);
      await profile.save();
      return res.json(profile.education);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json(error.message);
    }
  }
);

/*
@route  GET  api/profile/gitlab/:username
@desc        get the rpos of a user by gitlab username 
@access      public 
*/
router.get("/github/:username", async (req, res) => {
  const clientId = config.get("githubCliendId");
  const clientsecret = config.get("githubCliendSecret");
  const options = {
    uri: `https://api.github.com/users/${
      req.params.username
    }/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientsecret}`,
    method: "GET",
    headers: { "user-agent": "node.js" }
  };

  request(options, (err, respond, body) => {
    if (err) throw err;
    if (respond.statusCode !== 200) {
      return res.status(400).json({ msg: "Cannot find the Github account " });
    }
    return res.json(JSON.parse(body));
  });
});

module.exports = router;
