const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Rental, validateRental } = require("../models/rentalModel");
const { Movie } = require("../models/moviesModel");
const { Customer } = require("../models/customerModel");
const Fawn = require("fawn");

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.get("/:id", async (req, res) => {
  // mongoDB id validation
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(400).send("Invalid id");

  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send("Invalid rental");
  res.send(rental);
});

router.post("/", async (req, res) => {
  const customerId = req.body.customerId;

  const movieId = req.body.movieId;
  // Input validation
  const { error } = validateRental(customerId, movieId);
  if (error) return res.status(400).send(error.details[0].message);
  // // Id validation
  // // this should be done in validate function. Therefore use joi-objectid package to do this
  // const isValidCustomerId = mongoose.Types.ObjectId.isValid(customerId);
  // if (!isValidCustomerId) return res.status(400).send("Invalid customer Id");
  // const isValidMovieId = mongoose.Types.ObjectId.isValid(movieId);
  // if (!isValidMovieId) return res.status(400).send("Invalid movie Id");

  const customer = await Customer.findById(customerId);
  if (!customer) return res.status(404).send("Invalid customer");

  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(404).send("Invalid movie");

  if (movie.numberInStock === 0) return res.send("Movie not available");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // there are two operations rental and movie, therefore we need transactions
  // in mongodb there is no transactions
  // can use two phase commit for that
  // here need to install 'fawn' to simulate transactions in mongo

  //   rental = await rental.save();

  //   movie.numberInStock--;
  //   movie.save();

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await rental.save({ session });

    movie.numberInStock--;
    await movie.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.send(rental);
  } catch (ex) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction error:", ex.message);
    res.status(500).send("Something failed: " + ex.message);
  }

  // try {
  //   new Fawn.Task()
  //     .save("rentals", rental)
  //     .update(
  //       "movies",
  //       { _id: movie._id },
  //       {
  //         $inc: { numberInStock: -1 },
  //       }
  //     )
  //     .run();
  // } catch (ex) {
  //   res.status(500).send("Something failed");
  // }

  // res.send(rental);
});

module.exports = router;
