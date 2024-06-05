const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 55,
  },
});

function validate(name) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate({ name });
}

const Genre = mongoose.model("Genre", genreSchema);

module.exports = {
  Genre,
  validate,
  genreSchema,
};
