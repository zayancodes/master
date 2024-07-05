const Food = require('../models/Food');
const PDFDocument = require('pdfkit');
const { format } = require('date-fns');

// Add food purchase
exports.addFood = async (req, res) => {
  try {
    const { name, price, amount, date } = req.body;
    const food = new Food({ name, price, amount, date });
    await food.save();
    res.status(201).json({ message: 'Food added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get monthly food list
exports.getMonthlyFood = async (req, res) => {
  try {
    const { month, year } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const foods = await Food.find({
      date: { $gte: startDate, $lte: endDate }
    });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Download monthly food list as PDF
exports.downloadMonthlyFoodPDF = async (req, res) => {
  try {
    const { month, year } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const foods = await Food.find({
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

    doc.fontSize(25).text(`Food List for ${format(startDate, 'MMMM yyyy')}`, { align: 'center' });

    foods.forEach((food) => {
      doc.fontSize(15).text(`Name: ${food.name}, Price: ${food.price}, Amount: ${food.amount}, Date: ${format(food.date, 'dd-MM-yyyy')}`);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
