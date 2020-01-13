const express = require("express");
const Video = require("../models/video");
const router = express();
const auth = require("../middleware/auth");

router.post("/api/v1/video", auth, async (req, res) => {
  try {
    const category = await new Video({
      ...req.body,
      author: req.user._id
    });
    await category.save();
    res.status(201).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/v1/video", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    Video.find({})
      .populate({ path: "author", select: "name" })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec((err, videoList) => {
        if (err) {
          res.status(422).send(err);
        }
        Video.countDocuments({}).exec((count_error, count) => {
          if (count_error) {
            res.status(422).send(count_error);
          }
          res.status(200).json({
            total: count,
            totalPage: Math.ceil(count / limit),
            page: page,
            pageSize: limit,
            data: videoList
          });
        });
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/video/:id", auth, async (req, res) => {
  try {
    Video.findById({ _id: req.params.id }).exec((err, data) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(200).json(data);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/api/v1/video/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const video = await Video.findById({ _id: req.params.id });
    if (!video) {
      res.status(404).send({ status: 404, message: "Video not found." });
    }
    updates.forEach(update => (video[update] = req.body[update]));
    await video.save();
    res.status(200).json(video);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/api/v1/video/:id", auth, async (req, res) => {
  try {
    Video.deleteOne({ _id: req.params.id }).exec(err => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(200).send({ status: "Delete succesed!", id: req.params.id });
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
