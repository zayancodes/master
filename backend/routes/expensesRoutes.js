const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');


router.post('/add',auth,adminAuth, expensesController.addExpenses);
router.get('/monthly/:month/:year',auth,adminAuth, expensesController.getMonthlyExpenses);
router.get('/download/:month/:year',auth,adminAuth, expensesController.downloadMonthlyExpensesPDF);

module.exports = router;
