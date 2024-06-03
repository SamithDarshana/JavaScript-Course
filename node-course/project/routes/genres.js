const express = require("express");
const Joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const genre = await Genre.findById(id);
  if (!genre) return res.status(404).send("Not found");
  res.send(genre);
});

router.post("/", async (req, res) => {
  const name = req.body.name;
  const { error } = validate(name);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: name });
  try {
    genre = await genre.save();
    res.send("Genre added", genre);
  } catch (ex) {
    console.log(ex.errors);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const { error } = validate(name);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    id,
    { name: name },
    { new: true }
  );
  if (!genre) return res.status(404).send("Not found");
  res.send("Genre updated");
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const genre = await Genre.findByIdAndDelete(id);
  if (!genre) return res.status(404).send("Not found");
  res.send("Genre deleted");
});

function validate(name) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate({ name });
}

module.exports = router;
