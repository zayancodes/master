// models/Invoice.js
const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;
