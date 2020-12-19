const express = require('express');
const router = express.Router();
const { signup, accountActivation } = require('../controllers/authController');
const { runValidation } = require('../validators');
const { signupValidator } = require('../validators/auth');

router.post('/signup', signupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);

module.exports = router;
