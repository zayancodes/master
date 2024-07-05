const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

router.get('/dashboard', auth, getDashboardData);

module.exports = router;
