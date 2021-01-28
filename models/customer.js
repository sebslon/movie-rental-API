const Joi = require('joi');
const mongoose = require("mongoose");

const Customer = mongoose.model("Customer", new mongoose.Schema({
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
      maxlength: 10,
    },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(6).max(10).required(),
    isGold: Joi.boolean()
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;