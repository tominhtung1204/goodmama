const express = require("express");
const Banner = require("../models/banner");
const router = express();
const auth = require("../middleware/auth");
const upload = require("../upload-config");

router.post(
  "/api/v1/banner",
  auth,
  upload.single("image"),
  async (req, res) => {
    const banner = new Banner(req.body);
    try {
      banner.image = req.file.data.link;
      await banner.save();
      res.status(201).json(banner);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.get("/api/v1/banner", async (req, res) => {
  try {
    let query = {};
    if (req.query.isSlider) {
      query = { isSlider: req.query.isSlider === "true" };
    }
    Banner.find(query)
      .sort({ createdAt: -1 })
      .exec((err, allBanner) => {
        if (err) {
          res.status(422).send(err);
        } else {
          res.status(200).json(allBanner);
        }
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/banner/:id", auth, async (req, res) => {
  try {
    Banner.findById({ _id: req.params.id }).exec((err, data) => {
      if (err) {
        res.status(422).send(err);
      } else if (!data) {
        res.status(404).send({ status: 404, message: "Banner not found" });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put(
  "/api/v1/banner/:id",
  auth,
  upload.single("image"),
  async (req, res) => {
    const updates = Object.keys(req.body);
    try {
      const banner = await Banner.findById({ _id: req.params.id });
      if (!banner) {
        res.status(404).send({ status: 404, message: "Banner not found." });
      }
      updates.forEach(update => (banner[update] = req.body[update]));
      banner.image =
        req.file && req.file.data ? req.file.data.link : req.body.image;
      await banner.save();
      res.status(200).json(banner);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete("/api/v1/banner/:id", auth, async (req, res) => {
  try {
    Banner.deleteOne({ _id: req.params.id }).exec(err => {
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
