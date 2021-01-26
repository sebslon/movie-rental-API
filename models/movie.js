const mongoose = require("mongoose");
const {genreSchema} = require('./genre');

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: { type: String, required: true, trim: true },
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

exports.Movie = Movie;