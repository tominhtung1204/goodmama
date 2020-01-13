const mongoose = require("mongoose");
const validator = require("validator");

const infoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    maxlength: 60
  },
  description: {
    type: String,
    require: true,
    minlength: 50,
    maxlength: 160
  },
  keyword: {
    type: String
  },
  googleSearch: {
    type: String
  },
  logo: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  facebook: {
    type: String
  },
  zalo: {
    type: String
  },
  twitter: {
    type: String
  },
  skype: {
    type: String
  },
  linkedin: {
    type: String
  }
});

const Info = mongoose.model("Info", infoSchema);

module.exports = Info;
