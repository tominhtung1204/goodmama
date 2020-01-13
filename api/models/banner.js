const mongoose = require('mongoose');
const validator = require('validator');

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  isSlider: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
