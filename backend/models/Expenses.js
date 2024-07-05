const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Expenses', expensesSchema);
