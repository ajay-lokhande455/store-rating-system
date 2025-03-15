const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const token = authHeader.split(' ')[1]; 


      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.error('JWT Verification Error:', err.message);
          return res.status(403).json({ message: 'Invalid token', error: err.message });
        }

        if (roles.length && !roles.includes(user.role)) {
          return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }

        req.user = user; 
        next();
      });

    } catch (error) {
      console.error('Auth Middleware Error:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

module.exports = authMiddleware;
