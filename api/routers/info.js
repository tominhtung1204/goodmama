const express = require("express");
const Info = require("../models/info");
const router = express();
const auth = require("../middleware/auth");
const upload = require("../upload-config");

router.post("/api/v1/info", upload.single("image"), async (req, res) => {
  try {
    const info = new Info(req.body);
    info.logo = req.file.data.link;
    info.save((err, infoDetail) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(201).send(infoDetail);
      }
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/v1/info", async (req, res) => {
  try {
    Info.findOne({}, (err, infoDetail) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(200).json(infoDetail);
      }
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/api/v1/info", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const info = await Info.find({});
    if (!info) {
      return res.status(404).send();
    }
    updates.forEach(update => (info[0][update] = req.body[update]));
    info[0].save((err, infoDetail) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(200).json(infoDetail);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/api/v1/logo", auth, upload.single("image"), async (req, res) => {
  try {
    const info = await Info.findOne({});
    if (!info) {
      return res.status(404).send();
    }
    info.logo = req.file.data.link;
    info.save((err, infoDetail) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(200).send(infoDetail);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/api/v1/logo", auth, async (req, res) => {
  try {
    const info = await Info.findOne({});
    if (!info) {
      return res.status(404).send();
    }
    info.logo = "";
    info.save((err, infoDetail) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(200).send(infoDetail);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
