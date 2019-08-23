const mongoos = require("mongoose");
const postSchema = require("../migrations/postSchema");

const Post = mongoos.model("post", postSchema);

module.exports = Post;
