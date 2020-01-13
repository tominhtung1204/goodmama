const express = require("express");
const Testimonial = require("../models/testimonial");
const router = express();
const auth = require("../middleware/auth");
const upload = require("../upload-config");

router.post(
  "/api/v1/testimonial",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const testimonial = new Testimonial(req.body);
      testimonial.image = req.file.data.link;
      testimonial.save((err, bannerDetail) => {
        if (err) {
          res.status(422).send(err);
        } else {
          res.status(201).json(bannerDetail);
        }
      });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.get("/api/v1/testimonial", async (req, res) => {
  try {
    Testimonial.find({})
      .sort({ createdAt: -1 })
      .exec((err, allTestimonial) => {
        if (err) {
          res.status(422).send(err);
        } else {
          res.status(200).json(allTestimonial);
        }
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/testimonial/:id", auth, async (req, res) => {
  try {
    Testimonial.findById({ _id: req.params.id }).exec((err, data) => {
      if (err) {
        res.status(422).send(err);
      } else if (!data) {
        res.status(404).send({ status: 404, message: "Testimonial not found" });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put(
  "/api/v1/testimonial/:id",
  auth,
  upload.single("image"),
  async (req, res) => {
    const updates = Object.keys(req.body);
    try {
      const testimonial = await Testimonial.findById({ _id: req.params.id });
      if (!testimonial) {
        res
          .status(404)
          .send({ status: 404, message: "Testimonial not found." });
      }
      updates.forEach(update => (updates[update] = req.body[update]));
      testimonial.image =
        req.file && req.file.data ? req.file.data.link : req.body.image;
      await testimonial.save();
      res.status(200).json(testimonial);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete("/api/v1/testimonial/:id", auth, async (req, res) => {
  try {
    Testimonial.deleteOne({ _id: req.params.id }).exec(err => {
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
