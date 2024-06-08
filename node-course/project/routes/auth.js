const express = require("express");
const router = express.Router();
const Joi = require("joi");

const _ = require("lodash"); // for utility functions
const bcrypt = require("bcrypt"); // for hash password

const isValidId = require("../utils/validateId");

const { User } = require("../models/userModel");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { error } = validateUser(email, password);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.send(token);
});

function validateUser(email, password) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255),
  });
  return schema.validate({ email, password });
}

module.exports = router;
