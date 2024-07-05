// models/Invoice.js
const mongoose = require('mongoose');

const InvoiceListSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  username: { type:String , require : true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false }
});

const InvoiceList = mongoose.model('InvoiceList', InvoiceListSchema);
module.exports = InvoiceList;
