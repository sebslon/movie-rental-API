const {Customer, validate} = require('../models/customer');
const auth = require('../middleware/auth');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", validateObjectId, async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Customer with given ID was not found');

    res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({ 
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer = await customer.save();
  
  res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    res.send(customer);
});

module.exports = router;
