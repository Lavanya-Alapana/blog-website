const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { BadRequestError, UnauthorizedError, NotFoundError } = require('../utils/customErrors');

class AuthService {
  async registerUser(userData) {
    const { name, email, password } = userData;

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new BadRequestError('User already exists');
    }

    const user = await User.create({ name, email, password });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    };
  }

  async loginUser(credentials) {
    const { email, password } = credentials;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      throw new UnauthorizedError('Invalid email or password');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    };
  }

  async getUserProfile(userId) {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email
    };
  }
}

module.exports = new AuthService();
