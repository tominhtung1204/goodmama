const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  url: {
    type: String,
    require: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
