const express = require("express");
const Product = require("../models/product");
const router = express();
const auth = require("../middleware/auth");
const upload = require("../upload-config");
const slugify = require("slugify");

router.get("/api/v1/product", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    let query = {};
    if (req.query.saleProduct) {
      query = { saleProduct: req.query.saleProduct === "true" };
    }
    if (req.query.newProduct) {
      query = { newProduct: req.query.newProduct === "true" };
    }
    if (req.query.hotProduct) {
      query = { hotProduct: req.query.hotProduct === "true" };
    }
    if (req.query.category) {
      query = {
        category: {
          $in: req.query.category
        }
      };
    }
    Product.find(query)
      .populate({
        path: "category"
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec((err, productList) => {
        if (err) {
          res.status(422).send(err);
        }
        Product.countDocuments(query).exec((count_error, count) => {
          if (count_error) {
            res.status(422).send(count_error);
          }
          res.status(200).json({
            total: count,
            totalPage: Math.ceil(count / limit),
            page: page,
            pageSize: limit,
            data: productList
          });
        });
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/api/v1/product", auth, upload.any("image"), (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      image: req.files,
      count: JSON.parse(req.body.count),
      size: JSON.parse(req.body.size),
      slug: slugify(req.body.name, {
        replacement: "-",
        remove: /[*+~.()'"!:@?_]/g,
        lower: true
      })
    });

    product.save((err, blogDetail) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(201).json(blogDetail);
      }
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/api/v1/product/:id", auth, async (req, res) => {
  try {
    Product.deleteOne({ _id: req.params.id }).exec(err => {
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

router.delete("/api/v1/product/:id", auth, async (req, res) => {
  try {
    Product.deleteOne({ _id: req.params.id }).exec(err => {
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

router.get("/api/v1/product/id/:id", async (req, res) => {
  try {
    Product.findById({ _id: req.params.id }).exec((err, data) => {
      if (err) {
        res.status(404).send({ status: 404, message: "Product not found" });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/product/:slug", (req, res) => {
  try {
    Product.findOne({ slug: req.params.slug }).exec((err, data) => {
      if (err) {
        res.status(404).send({ status: 404, message: "Product not found" });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/api/v1/product/:id/image", auth, async (req, res) => {
  try {
    const index = req.query.index;
    const product = await Product.findById({ _id: req.params.id });
    if (!product) {
      res.status(404).send({ status: 404, message: "Product not found." });
    }
    await product.image.splice(index, 1);
    await product.save();
    res.status(200).json(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put(
  "/api/v1/product/:id",
  auth,
  upload.any("files"),
  async (req, res) => {
    const updates = Object.keys(req.body);
    try {
      const product = await Product.findById({ _id: req.params.id });
      if (!product) {
        res.status(404).send({ status: 404, message: "Product not found." });
      }
      updates.forEach(update => (product[update] = req.body[update]));
      product.image =
        req.files.length > 0 ? product.image.concat(req.files) : product.image;
      product.count = JSON.parse(req.body.count);
      (product.size = JSON.parse(req.body.size)),
        (product.slug = slugify(req.body.name, {
          replacement: "-",
          remove: /[*+~.()'"!:@?_]/g,
          lower: true
        }));
      product.createdAt = Date.now();
      await product.save();
      res.status(200).json(product);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

module.exports = router;
