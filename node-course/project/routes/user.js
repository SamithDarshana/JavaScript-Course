const express = require("express");
const router = express.Router();

const _ = require("lodash"); // for utility functions
const bcrypt = require("bcrypt"); // for hash password
const jwt = require("jsonwebtoken");

const isValidId = require("../utils/validateId");
const auth = require("../middlewares/auth");

const { User, validateUser } = require("../models/userModel");

router.get("/", async (req, res) => {
  const users = await User.find().sort("username");
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const isValid = isValidId(req.params.id);
  if (!isValid) return res.status(400).send("Invalid user");

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("Not found");

  res.send(user);
});

router.post("/", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;

  const { error } = validateUser(username, email, password);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = new User({
    username,
    email,
    password,
  });

  try {
    await user.save();
    const token = user.generateAuthToken();
    //const token = jwt.sign({ _id: this._id }, process.env.vidlyproject_jwtkey);
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "username", "email"]));
  } catch (ex) {
    console.error(ex.errors);
  }
});

router.put("/:id", auth, async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const isValid = isValidId(req.params.id);
  if (!isValid) return res.status(400).send("Invalid user");

  const { error } = validateUser(username, email, password);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { username, email, password },
    { new: true }
  );
  if (!user) return res.status(404).send("User not found");

  res.send(user);
});

router.delete("/:id", auth, async (req, res) => {
  const isValid = isValidId(req.params.id);
  if (!isValid) return res.status(400).send("Invalid user");

  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("Invalid user");

  res.send(user);
});

module.exports = router;
