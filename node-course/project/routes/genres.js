const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genreModel");
const auth = require("../middlewares/auth");

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

router.post("/", auth, async (req, res) => {
  const name = req.body.name;
  const { error } = validate(name);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: name });
  try {
    genre = await genre.save();
    res.send("Genre added");
  } catch (ex) {
    console.log(ex.errors);
  }
});

router.put("/:id", auth, async (req, res) => {
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

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const genre = await Genre.findByIdAndDelete(id);
  if (!genre) return res.status(404).send("Not found");
  res.send("Genre deleted");
});

module.exports = router;
