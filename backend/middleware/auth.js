// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    // return res.status(401).json({ message: 'No token, authorization denied',redirectTo: '/' });
    res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.redirect('/');
    // res.status(401).json({ message: 'Token is not valid' });
  }
};
