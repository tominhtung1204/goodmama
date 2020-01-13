const mongoose = require('mongoose');
const validator = require('validator');

const categoryBlogSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

categoryBlogSchema.virtual('blog', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'category'
});

const categoryBlog = mongoose.model('categoryBlog', categoryBlogSchema);

module.exports = categoryBlog;
