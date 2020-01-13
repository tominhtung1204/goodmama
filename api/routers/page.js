const express = require("express");
const Page = require("../models/page");
const router = express();
const auth = require("../middleware/auth");
const slugify = require("slugify");

router.post("/api/v1/page", async (req, res) => {
  try {
    const page = await new Page({
      ...req.body,
      url: slugify(req.body.name, {
        replacement: "-",
        remove: /[*+~.()'"!:@?_]/g,
        lower: true
      })
    });
    await page.save();
    res.status(201).send(page);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/v1/page", (req, res) => {
  try {
    Page.find({})
      .sort({ createdAt: -1 })
      .exec((err, allPage) => {
        if (err) {
          res.status(422).send(err);
        } else {
          res.status(200).json(allPage);
        }
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/page/:id", (req, res) => {
  try {
    Page.findOne({ url: req.params.id }).exec((err, data) => {
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

router.put("/api/v1/page/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const page = await Page.findOne({ url: req.params.id });
    if (!page) {
      res.status(404).send({ status: 404, message: "Page not found." });
    }
    updates.forEach(update => (page[update] = req.body[update]));
    page.url = slugify(req.body.name, {
      replacement: "-",
      remove: /[*+~.()'"!:@?_]/g,
      lower: true
    });
    await page.save();
    res.status(200).json(page);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/api/v1/page/:id", auth, async (req, res) => {
  try {
    Page.deleteOne({ _id: req.params.id }).exec(err => {
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
