const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  size: Number,
  location: String,
  type: String  // 'Sale' or 'Rent'
});

module.exports = mongoose.model('Property', propertySchema);
