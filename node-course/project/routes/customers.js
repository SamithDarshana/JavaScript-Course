const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customerModel");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);
  if (!customer) return res.status(404).send("Not found");
  res.send(customer);
});

router.post("/", auth, async (req, res) => {
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

router.put("/:id", auth, async (req, res) => {
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

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) return res.status(404).send("Not found");
  res.send("Customer deleted");
});

module.exports = router;
