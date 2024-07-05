const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const dashboardRoutes = require('./routes/dashboardRoutes')
const adminRoutes = require('./routes/adminRoutes')
const foodRoutes = require('./routes/foodRoutes');
const expenseRoutes = require('./routes/expensesRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();

const app = express();
connectDB();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/', dashboardRoutes);
app.use('/api/',adminRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
