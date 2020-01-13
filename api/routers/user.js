const express = require("express");
const User = require("../models/user");
const router = express();
const auth = require("../middleware/auth");

router.post("/api/v1/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/v1/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ _id: user._id, token: token });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
