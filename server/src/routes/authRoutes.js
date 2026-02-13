const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { validateRegister, validateLogin, validate } = require('../middlewares/validator');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', validateRegister, validate, register);
router.post('/login', validateLogin, validate, login);
router.get('/profile', protect, getProfile);

module.exports = router;
