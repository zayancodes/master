// controllers/studentController.js

const Student = require('../models/Student');
const InvoiceList = require('../models/Invoicelist');

// Fetch all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

// Fetch a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error });
  }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
  try {
      const filter = { student: req.params.id };
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
    const myStudent = await InvoiceList.updateMany(filter,{username : req.body.username});

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
};
