const mongoose = require('mongoose');
const validator = require('validator');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
