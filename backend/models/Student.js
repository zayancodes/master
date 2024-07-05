// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  },
  hostel: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  }
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;