const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: { type: Boolean, required: true, default: false },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 10
    },
  })
);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    res.send(customer);
  } catch(err) {
    res.status(404).send(err.message)
  }
});

router.post("/", async (req, res) => {
  try {
    let customer = new Customer({
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    });
    customer = await customer.save();
    res.send(customer);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true }
    );
    res.send(customer);
  } catch(err) {
    res.status(404).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    res.send(customer);
  } catch(err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
