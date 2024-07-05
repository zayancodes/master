// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { addStudent } = require('../controllers/adminController');
const { getAdminDashboardData ,getUserDashboardData ,getUserName } = require('../controllers/dashboardController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
// Admin routes
router.get('/admin-dashboard', auth, adminAuth, getAdminDashboardData);
router.post('/add-student', auth, adminAuth, addStudent);

router.get('/user-dashboard', auth, getUserDashboardData);
router.post('/user-dashboard',auth,getUserName);

module.exports = router;
