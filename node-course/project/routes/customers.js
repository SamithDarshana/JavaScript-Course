const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

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

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);
  if (!customer) return res.status(404).send("Not found");
  res.send(customer);
});

router.post("/", async (req, res) => {
  const name = req.body.name;
  const isGold = req.body.isGold;
  const phone = req.body.phone;
  const { error } = validate(name, isGold, phone);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = new Customer({
    name: name,
    isGold: isGold,
    phone: phone,
  });
  try {
    customer = await customer.save();
    res.send(customer);
  } catch (ex) {
    console.log(ex.errors);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const isGold = req.body.isGold;
  const phone = req.body.phone;
  const { error } = validate(name, isGold, phone);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(
    id,
    { name: name, isGold: isGold, phone: phone },
    { new: true }
  );
  if (!customer) return res.status(404).send("Not found");
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) return res.status(404).send("Not found");
  res.send("Customer deleted");
});

function validate(name, isGold, phone) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().min(10).max(12).required(),
  });
  return schema.validate({ name, isGold, phone });
}

module.exports = router;
