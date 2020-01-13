const express = require("express");
const Blog = require("../models/blog");
const router = express();
const auth = require("../middleware/auth");
const upload = require("../upload-config");
const slugify = require("slugify");

router.get("/api/v1/blog", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = {};
    Blog.find(query)
      .populate({ path: "author", select: "name" })
      .populate({
        path: "category",
        select: "title"
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec((err, blogList) => {
        if (err) {
          res.status(422).send(err);
        }
        Blog.countDocuments(query).exec((count_error, count) => {
          if (count_error) {
            res.status(422).send(count_error);
          }
          res.status(200).json({
            total: count,
            totalPage: Math.ceil(count / limit),
            page: page,
            pageSize: limit,
            data: blogList
          });
        });
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/api/v1/blog", auth, upload.single("image"), async (req, res) => {
  try {
    const blog = new Blog({
      ...req.body,
      image: req.file.data.link,
      slug: slugify(req.body.title, {
        replacement: "-",
        remove: /[*+~.()'"!:@?_]/g,
        lower: true
      }),
      author: req.user._id
    });
    blog.save((err, blogDetail) => {
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

router.delete("/api/v1/blog/:id", auth, async (req, res) => {
  try {
    Blog.deleteOne({ _id: req.params.id }).exec(err => {
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

router.post("/api/v1/media", auth, upload.single("image"), async (req, res) => {
  try {
    const image = req.file.data.link;
    res.status(200).json(image);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/v1/blog/id/:id", auth, async (req, res) => {
  try {
    Blog.findById({ _id: req.params.id }).exec((err, data) => {
      if (err) {
        res.status(404).send({ status: 404, message: "Blog not found" });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/blog/:slug", async (req, res) => {
  try {
    Blog.findOne({ slug: req.params.slug })
      .populate({ path: "author", select: "name" })
      .populate({
        path: "category",
        select: "title"
      })
      .exec((err, data) => {
        if (err) {
          res.status(404).send({ status: 404, message: "Blog not found" });
        } else {
          res.status(200).json(data);
        }
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put(
  "/api/v1/blog/:id",
  auth,
  upload.single("image"),
  async (req, res) => {
    const updates = Object.keys(req.body);
    try {
      const blog = await Blog.findById({ _id: req.params.id });
      if (!blog) {
        res.status(404).send({ status: 404, message: "Blog not found." });
      }
      updates.forEach(update => (blog[update] = req.body[update]));
      blog.image =
        req.file && req.file.data ? req.file.data.link : req.body.image;
      blog.slug = slugify(req.body.title, {
        replacement: "-",
        remove: /[*+~.()'"!:@?_]/,
        lower: true
      });
      blog.author = req.user._id;
      await blog.save();
      res.status(200).json(blog);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

module.exports = router;
