const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/moviesModel");
const { Genre } = require("../models/genreModel");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  if (!movie) return res.status(404).send("Invalid movie");
  res.send(movie);
});

router.post("/", async (req, res) => {
  const title = req.body.title;
  const genreId = req.body.genreId;
  const numberInStock = req.body.numberInStock;
  const dailyRentalRate = req.body.dailyRentalRate;
  const { error } = validateMovie(
    title,
    genreId,
    numberInStock,
    dailyRentalRate
  );
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(genreId);
  if (!genre) return res.status(404).send("Invalid genre");

  const movie = new Movie({
    title: title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: numberInStock,
    dailyRentalRate: dailyRentalRate,
  });
  try {
    await movie.save();
    res.send(movie);
  } catch (ex) {
    console.error(ex.errors);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const title = req.body.title;
  const genreId = req.body.genreId;
  const numberInStock = req.body.numberInStock;
  const dailyRentalRate = req.body.dailyRentalRate;
  const { error } = validateMovie(
    title,
    genreId,
    numberInStock,
    dailyRentalRate
  );
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(genreId);
  if (!genre) return res.status(404).send("Invalid genre");

  const movie = await Movie.findByIdAndUpdate(
    id,
    {
      title: title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: numberInStock,
      dailyRentalRate: dailyRentalRate,
    },
    {
      new: true,
    }
  );
  if (!movie) return res.status(404).send("Invalid movie");
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) return res.status(404).send("Invalid movie");
  res.send("Movie deleted");
});

module.exports = router;
