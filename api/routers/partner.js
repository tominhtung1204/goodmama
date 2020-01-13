const express = require("express");
const Partner = require("../models/partner");
const router = express();
const auth = require("../middleware/auth");
const upload = require("../upload-config");

router.post(
  "/api/v1/partner",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const partner = new Partner(req.body);
      partner.image = req.file.data.link;
      partner.save((err, parterDetail) => {
        if (err) {
          res.status(422).send(err);
        } else {
          res.status(201).json(parterDetail);
        }
      });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.get("/api/v1/partner", async (req, res) => {
  try {
    Partner.find({})
      .sort({ createdAt: -1 })
      .exec((err, allPartner) => {
        if (err) {
          res.status(422).send(err);
        } else {
          res.status(200).json(allPartner);
        }
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/partner/:id", auth, async (req, res) => {
  try {
    Partner.findById({ _id: req.params.id }).exec((err, data) => {
      if (err) {
        res.status(422).send(err);
      } else if (!data) {
        res.status(404).send({ status: 404, message: "Partner not found" });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put(
  "/api/v1/partner/:id",
  auth,
  upload.single("image"),
  async (req, res) => {
    const updates = Object.keys(req.body);
    try {
      const partner = await Partner.findById({ _id: req.params.id });
      if (!partner) {
        res.status(404).send({ status: 404, message: "Partner not found." });
      }
      updates.forEach(update => (partner[update] = req.body[update]));
      partner.image =
        req.file && req.file.data ? req.file.data.link : req.body.image;
      await partner.save();
      res.status(200).send(partner);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete("/api/v1/partner/:id", auth, async (req, res) => {
  try {
    Partner.deleteOne({ _id: req.params.id }).exec(err => {
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
