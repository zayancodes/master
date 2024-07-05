// routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const { generateInvoices, getUnpaidInvoices, markInvoiceAsPaid , downloadMonthlyInvoicesPDF,getMonthlyInvoices } = require('../controllers/invoiceController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Generate invoices (could be called via a cron job at the start of each month)
router.post('/generate-invoices', auth, adminAuth, generateInvoices);

// Get unpaid invoices for the current month
router.get('/unpaid-invoices', auth, adminAuth, getUnpaidInvoices);

// Mark an invoice as paid
router.put('/mark-invoice-paid/:id', auth, adminAuth, markInvoiceAsPaid);

router.get('/monthly/:month/:year', auth, adminAuth, getMonthlyInvoices);
router.get('/download/:month/:year', auth, adminAuth, downloadMonthlyInvoicesPDF);



module.exports = router;
