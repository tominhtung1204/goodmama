const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  url: {
    type: String,
    required: true
  },
  children: [
    {
      name: {
        type: String,
        require: true
      },
      section: {
        type: String
      },
      url: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("Menu", menuSchema);
