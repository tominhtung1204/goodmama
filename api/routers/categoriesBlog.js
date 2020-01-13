const express = require("express");
const categoryBlog = require("../models/categoriesBlog");
const router = express();
const auth = require("../middleware/auth");
const config = require("../config");

router.post("/api/v1/blog/category", async (req, res) => {
  try {
    const category = await new categoryBlog(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/v1/blog/category", async (req, res) => {
  try {
    categoryBlog
      .find({})
      .sort({ createdAt: -1 })
      .exec((err, allCategory) => {
        if (err) {
          res.status(422).send(err);
        } else {
          res.status(200).json(allCategory);
        }
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/blog/category/:id", auth, async (req, res) => {
  try {
    categoryBlog.findById({ _id: req.params.id }).exec((err, data) => {
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

router.put("/api/v1/blog/category/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const category = await categoryBlog.findById({ _id: req.params.id });
    if (!category) {
      res.status(404).send({ status: 404, message: "Banner not found." });
    }
    updates.forEach(update => (category[update] = req.body[update]));
    await category.save();
    res.status(200).json(category);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/api/v1/blog/category/:id", auth, async (req, res) => {
  try {
    categoryBlog.deleteOne({ _id: req.params.id }).exec(err => {
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
