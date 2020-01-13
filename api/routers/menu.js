const express = require("express");
const Menu = require("../models/menu");
const router = express();
const auth = require("../middleware/auth");

router.post("/api/v1/menu", async (req, res) => {
  try {
    const menu = await new Menu(req.body);
    await menu.save();
    res.status(201).send(menu);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/v1/menu", async (req, res) => {
  try {
    Menu.find({})
      .sort({ createdAt: -1 })
      .exec((err, allMenu) => {
        if (err) {
          res.status(422).send(err);
        } else {
          res.status(200).json(allMenu);
        }
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/menu/:id", auth, async (req, res) => {
  try {
    Menu.findById({ _id: req.params.id }).exec((err, data) => {
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

router.put("/api/v1/menu/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const menu = await Menu.findById({ _id: req.params.id });
    if (!menu) {
      res.status(404).send({ status: 404, message: "Banner not found." });
    }
    updates.forEach(update => (menu[update] = req.body[update]));
    await menu.save();
    res.status(200).json(menu);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/api/v1/menu/:id", auth, async (req, res) => {
  try {
    Menu.deleteOne({ _id: req.params.id }).exec(err => {
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
