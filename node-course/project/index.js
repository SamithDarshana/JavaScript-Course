const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");

Joi.objectId = require("joi-objectid")(Joi);

const Fawn = require("fawn");

const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rental");
const users = require("./routes/user");
const auth = require("./routes/auth");

const app = express();
app.use(express.json());

if (!config.has("jwtkey")) {
  console.error("Fatal error: jwtkey is not defined");
  process.exit(1);
}

app.use("/api/genre", genres);
app.use("/api/customer", customers);
app.use("/api/movie", movies);
app.use("/api/rental", rentals);
app.use("/api/user", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening port ${port}...`);
});

mongoose
  .connect("mongodb://127.0.0.1/project-vidly")
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.error("Could not connect to database...", err));

Fawn.init("mongodb://localhost:27017/project-vidly");
