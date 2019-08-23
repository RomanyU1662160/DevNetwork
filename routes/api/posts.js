const express = require("express");
const auth = require("../../middleware/auth");
const route = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/user");
const Profile = require("../../models/profile");
const Post = require("../../models/post");

/*
@route GET  api/posts
@desc        return all posts 
@access      private
*/

route.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(error.message);
  }
});

/*
@route GET  api/posts/:postid
@desc       GET  a post by postid
 @access      private
*/
route.get("/:postid", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);
    return res.json({ msg: "post found ", post });
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(500).send("server error ...");
    }
    console.error(error.message);

    return res.status(500).send(error.message);
  }
});

/*
@route POST  api/posts
@desc       add new post
@access      private
*/
route.post(
  "/",
  [
    auth,
    [
      check("body", "Post cannot be empty..")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.id);

      let post = {
        user: user.id,
        name: user.name,
        avatar: user.avatar,
        body: req.body.body
      };
      post = new Post(post);
      await post.save();
      return res.json(post);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(error.message);
    }
  }
);

/*
@route PUT  api/posts/:postid
@desc       update a post
@access      private
*/

route.put(
  "/:postid",
  [
    auth,
    [
      check("body", "Post cannot be empty..")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erorrs: errors.array() });
    }
    try {
      const post = await Post.findById(req.params.postid);
      const user = await User.findById(req.id);
      console.log(user.email);
      if (post.user.toString() !== user.id) {
        return res.json(
          "You cannot edit this post , because you are not the owner"
        );
      }
      const { title, body } = req.body;
      post.title = title;
      post.body = body;
      await post.save();
      return res.json({ msg: "Post updated", post });
    } catch (error) {
      if (error.kind == "ObjectId") {
        return res.status(500).send("server error ...");
      }
      console.error(error.message);

      return res.status(500).send(error.message);
    }
  }
);
/*
@route GET  api/posts/:postid
@desc       GET  a post by postid
 @access      private
*/
route.delete("/:postid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.id);
    const post = await Post.findById(req.params.postid);
    console.log(post);
    if (!post) {
      return res.status(400).json({ msg: "Post not found." });
    }

    if (post.user.toString() !== user.id) {
      return res.json({
        msg: "You cannot delete this post, because you are not the owner."
      });
    }
    await Post.findOneAndDelete({ _id: req.params.postid });
    return res.json({ msg: "Post deleted..." });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(500).send("server error ...");
    }
    console.error(error.message);

    return res.status(500).send(error.message);
  }
});

module.exports = route;
