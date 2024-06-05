const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");

const app = express();

app.use(express.json());

app.use("/api/genre", genres);
app.use("/api/customer", customers);
app.use("/api/movie", movies);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening port ${port}...`);
});

mongoose
  .connect("mongodb://localhost:27017/project-vidly")
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.error("Could not connect to database...", err));
