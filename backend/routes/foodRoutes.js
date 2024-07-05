const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.post('/add',auth , adminAuth, foodController.addFood);
router.get('/monthly/:month/:year',auth , adminAuth,  foodController.getMonthlyFood);
router.get('/download/:month/:year',auth , adminAuth,  foodController.downloadMonthlyFoodPDF);

module.exports = router;
