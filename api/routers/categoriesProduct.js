const express = require("express");
const categoryProduct = require("../models/categoriesProduct");
const router = express();
const auth = require("../middleware/auth");
const upload = require("../upload-config");

router.post(
  "/api/v1/product/category",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const category = new categoryProduct(req.body);
      category.children = JSON.parse(req.body.children);
      category.image = req.file.data.link;
      category.save((err, categoryDetail) => {
        if (err) {
          res.status(422).send(err);
        } else {
          res.status(201).json(categoryDetail);
        }
      });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.get("/api/v1/product/category", async (req, res) => {
  try {
    categoryProduct
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

router.get("/api/v1/product/category/:id", auth, async (req, res) => {
  try {
    categoryProduct.findById({ _id: req.params.id }).exec((err, data) => {
      if (err) {
        res.status(422).send(err);
      } else if (!data) {
        res.status(404).send({ status: 404, message: "Category not found" });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put(
  "/api/v1/product/category/:id",
  auth,
  upload.single("image"),
  async (req, res) => {
    const updates = Object.keys(req.body);
    try {
      const category = await categoryProduct.findById({ _id: req.params.id });
      if (!category) {
        res.status(404).send({ status: 404, message: "Category not found." });
      }
      updates.forEach(update => (category[update] = req.body[update]));
      category.image =
        req.file && req.file.data ? req.file.data.link : req.body.image;
      await category.save();
      res.status(200).send(category);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete("/api/v1/product/category/:id", auth, async (req, res) => {
  try {
    categoryProduct.deleteOne({ _id: req.params.id }).exec(err => {
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
