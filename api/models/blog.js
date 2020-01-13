const mongoose = require("mongoose");
const validator = require("validator");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  slug: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "categoryBlog"
  },
  tag: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
