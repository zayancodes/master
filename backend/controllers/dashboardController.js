// dashboardController.js
const Student = require('../models/Student');

const InvoiceList = require('../models/Invoicelist');
exports.getDashboardData = (req, res) => {
  const user = req.user;
  if (user.isAdmin) {
    console.log("Welcome admin");
    res.json({
      message: 'Welcome to the Admin Dashboard',
      data: {
        // Add admin-specific data here
      }
    });
  } else {
    console.log("Welcome user");
    res.json({
      message: 'Welcome to the User Dashboard',
      data: {
        // Add user-specific data here
      }
    });
  }
};


// controllers/adminController.js
exports.getAdminDashboardData = (req, res) => {
  res.json({
    message: 'Welcome to the Admin Dashboard',
    data: {
      // Add admin-specific data here
    }
  });
};
exports.getUserName = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const zayan = await Student.find({ username });
    const sagar = zayan[0]._id;
    const InvoiceId = await InvoiceList.find({ student : sagar });
    console.log(sagar,zayan)
   
    res.json({
      data: zayan,
      invoiceData: InvoiceId
    });
  } catch (error) {
    console.error('Error fetching username data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserDashboardData = (req, res) => {
  
  res.json({
    message: 'Welcome to the User Dashboard'
  });
};