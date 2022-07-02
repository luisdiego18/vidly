const Joi = require("joi");
const mongoose = require("mongoose");

//Create schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

//Create model
const Genre = mongoose.model("Genre", genreSchema);

//Create Joi Validation
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(genre, {
    abortEarly: false,
  });
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
