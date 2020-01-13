const mongoose = require('mongoose');

const partnerSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  link: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
