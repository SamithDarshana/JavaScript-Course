const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 12,
    },
  })
);

function validate(name, isGold, phone) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().min(10).max(12).required(),
  });
  return schema.validate({ name, isGold, phone });
}

module.exports = {
  Customer,
  validate,
};
