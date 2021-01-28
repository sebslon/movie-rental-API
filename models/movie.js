const Joi = require('joi');
const joiObjectid = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const {genreSchema} = require('./genre');

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    genre: {
      type: genreSchema,
      required: true
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 200,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 200,
    }
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: joiObjectid().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  })

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;