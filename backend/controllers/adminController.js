// controllers/adminController.js

const Student = require('../models/Student');
const InvoiceList = require('../models/Invoicelist');
const User = require('../models/User');
const moment = require('moment');

exports.addStudent = async (req, res) => {
  const { name, fatherName, hostel, username, phoneNo, password, fee, address, batch } = req.body;

  try {
    let student = await Student.findOne({ username });
    if (student) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    student = new Student({
      name,
      fatherName,
      hostel,
      username,
      phoneNo,
      password,
      fee,
      address,
      batch,
    });

    await student.save();
    const newUser = new User({
      username: username,
      password: password,
      isAdmin: "false"
    });
    await newUser.save();

    // Get the month name in a format like "June"
    const currentMonth = moment().format('MMMM'); // This will give you the full month name like "June"
    const currentYear = moment().year();

    // Check if an invoice already exists for this student in the current month and year
    const invoiceExists = await InvoiceList.exists({
      student: student._id,
      month: currentMonth,
      year: currentYear,
    });

    if (!invoiceExists) {
      // Generate invoice for the new student
      const newInvoice = new InvoiceList({
        student: student._id,
        username: student.username,
        amount: student.fee,
        month: currentMonth,
        year: currentYear,
        isPaid: false,
      });
      await newInvoice.save();
      console.log('Invoice created successfully:', newInvoice);
    }

    res.json({ message: 'Student added successfully' });
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).send('Server error');
  }
};
