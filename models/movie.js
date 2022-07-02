const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

//Create model and schema
const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

//Create Joi Validation
function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(50).required(),
    dailyRentalRate: Joi.number().min(0).max(50).required(),
  });

  return schema.validate(movie, {
    abortEarly: false,
  });
}

exports.Movie = Movie;
exports.validate = validateMovie;
