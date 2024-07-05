const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Fetch all students
router.get('/students',auth,adminAuth, studentController.getStudents);

// Fetch a single student by ID
router.get('/students/:id',auth,adminAuth, studentController.getStudentById);

// Update a student by ID
router.put('/students/:id',auth,adminAuth, studentController.updateStudent);

// Delete a student by ID
router.delete('/students/:id',auth,adminAuth, studentController.deleteStudent);

module.exports = router;
