const mongoose = require("mongoose");

//Create model and schema
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    isGold: { type: Boolean, default: false },
    phone: { type: String, required: true, minlength: 5, maxlength: 50 },
  })
);

//Create Joi Validation
function validateCustomer(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(genre, {
    abortEarly: false,
  });
}

exports.Customer = Customer;
exports.validate = validateCustomer;
