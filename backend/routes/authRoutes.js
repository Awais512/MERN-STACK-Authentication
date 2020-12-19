const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');
const { runValidation } = require('../validators');
const { signupValidator } = require('../validators/auth');

router.post('/signup', signupValidator, runValidation, signup);

module.exports = router;
