// controllers/invoiceController.js
const Invoice = require('../models/Invoice');
const Student = require('../models/Student');
const InvoiceList = require('../models/Invoicelist');
const moment = require('moment');
const PDFDocument = require('pdfkit');


exports.generateInvoices = async (req, res) => {
  try {
    // Check if invoices for the current month already exist
    const currentMonth = moment().format('MMMM'); // This will give you the full month name like "June"
    const currentYear = moment().year();
    const invoicesExist = await InvoiceList.exists({
      month: currentMonth,
      year: currentYear,
    });

    if (invoicesExist) {
      return res.status(400).json({ message: 'Invoices for this month already generated' });
    }

    // Get all students who haven't been invoiced this month
    const students = await Student.find();

    // Create invoices for each student
    // const invoices = students.map(student => ({
    //   student: student._id,
    //   amount: student.fee,
    //   month: currentMonth,
    //   year: currentYear,
    //   isPaid: false,
    // }));

    // // Insert invoices into the database
    // await Invoice.insertMany(invoices);
    
    //ADD DATA TO INVOICE LIST 
    const Invoicelist = students.map(student => ({
      student: student._id,
      username: student.username,
      amount: student.fee,
      month: currentMonth,
      year: currentYear,
      isPaid: false,
    }));
    
    await InvoiceList.insertMany(Invoicelist);
    
    res.json({ message: 'Invoices generated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUnpaidInvoices = async (req, res) => {
  const currentMonth = moment().format('MMMM');
  const currentYear = moment().year();

  try {
    const Invoicelists = await InvoiceList.find({isPaid : false});
    const invoices = await Invoice.find({isPaid: false }).populate('student');
    res.json({ data : invoices,
      invoicelist : Invoicelists
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.markInvoiceAsPaid = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await InvoiceList.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    invoice.isPaid = true;
    await invoice.save();

    res.json({ message: 'Invoice marked as paid' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPaidInvoices = async (req, res) => {
  try {
    const Invoicelists = await InvoiceList.find({isPaid : true});
    res.json(Invoicelists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getMonthlyInvoices = async (req, res) => {
  try {
    const { month, year } = req.params;
    const monthString = new Date(year, month - 1).toLocaleString('default', { month: 'long' });

    const invoices = await InvoiceList.find({ month: monthString, year: Number(year) });

    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.downloadMonthlyInvoicesPDF = async (req, res) => {
  try {
    const { month, year } = req.params;
    const monthString = new Date(year, month - 1).toLocaleString('default', { month: 'long' });

    const invoices = await InvoiceList.find({ month: monthString, year: Number(year) });

    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.contentType('application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=invoices_${monthString}_${year}.pdf`);
      res.send(pdfData);
    });

    // Title
    doc.fontSize(25).text(`Invoice List for ${monthString} ${year}`, { align: 'center' });

    // Table Headers
    doc.moveDown().fontSize(16).font('Helvetica-Bold');
    const startX = 50;
    const amountX = 250;
    const paidX = 350;
    const lineHeight = 20;

    doc.text('Username', startX, doc.y, { width: amountX - startX, continued: true });
    doc.text('Amount', amountX, doc.y, { width: paidX - amountX, continued: true });
    doc.text('Paid', paidX, doc.y);

    doc.moveDown();

    // Table Rows
    doc.fontSize(12).font('Helvetica');
    invoices.forEach((invoice) => {
      const currentY = doc.y;
      doc.text(invoice.username, startX, currentY, { width: amountX - startX, ellipsis: true });
      doc.text(invoice.amount.toFixed(2), amountX, currentY, { width: paidX - amountX, align: 'right' });
      doc.text(invoice.isPaid ? 'Yes' : 'No', paidX, currentY, { width: 50, align: 'center' });
      // Draw underline
      doc.moveTo(startX, currentY + lineHeight - 5)
        .lineTo(paidX + 50, currentY + lineHeight - 5)
        .stroke();
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};