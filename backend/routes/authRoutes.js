const express = require('express');
const router = express.Router();
const {
  signup,
  accountActivation,
  signin,
} = require('../controllers/authController');
const { runValidation } = require('../validators');
const { signupValidator, signinValidator } = require('../validators/auth');

router.post('/signup', signupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', signinValidator, signin);

module.exports = router;
