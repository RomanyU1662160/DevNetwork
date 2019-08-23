const mongoos = require("mongoose");
const Schema = mongoos.Schema;
const Post = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  body: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      name: {
        type: String
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      name: {
        type: String
      },
      body: {
        type: String
      },
      date: {
        type: Date,
        date: Date.now
      }
    }
  ]
});
module.exports = Post;
