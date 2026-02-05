const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  ghlId: {
    type: String,
    required: true,
  },
  locationId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address1: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
  },
  source: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
