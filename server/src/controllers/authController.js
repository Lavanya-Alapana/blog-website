const authService = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const userData = await authService.registerUser(req.body);
    res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const userData = await authService.loginUser(req.body);
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userData = await authService.getUserProfile(req.user._id);
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile };
