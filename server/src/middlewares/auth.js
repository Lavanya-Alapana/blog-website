const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { UnauthorizedError } = require('../utils/customErrors');

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        throw new UnauthorizedError('User not found');
      }
      
      next();
    } else {
      throw new UnauthorizedError('Not authorized, no token');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { protect };
