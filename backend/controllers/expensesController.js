const Expenses = require('../models/Expenses');
const PDFDocument = require('pdfkit');
const { format } = require('date-fns');

// Add food purchase
exports.addExpenses = async (req, res) => {
  try {
    const { name, price,date } = req.body;
    const expenses = new Expenses({ name, price, date });
    await expenses.save();
    res.status(201).json({ message: 'Expenses added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get monthly food list
exports.getMonthlyExpenses = async (req, res) => {
  try {
    const { month, year } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const expenses = await Expenses.find({
      date: { $gte: startDate, $lte: endDate }
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Download monthly expenses list as PDF
exports.downloadMonthlyExpensesPDF = async (req, res) => {
  try {
    const { month, year } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const expenses = await Expenses.find({
      date: { $gte: startDate, $lte: endDate }
    });

    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.contentType('application/pdf');
      res.send(pdfData);
    });

    doc.fontSize(25).text(`Expenses List for ${format(startDate, 'MMMM yyyy')}`, { align: 'center' });

    expenses.forEach((expense) => {
      doc.fontSize(15).text(`Name: ${expense.name}, Price: ${expense.price}, Date: ${format(expense.date, 'dd-MM-yyyy')}`);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
