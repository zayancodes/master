// middleware/adminAuth.js
module.exports = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      // res.status(403).json({ 
      //   message: 'Access denied: Admins only',
      //   redirectTo: '/'  // Provide the URL to redirect to
      // });
      res.redirect('/');
      // res.status(403).json({ message: 'Access denied: Admins only' });
    }
  };
  