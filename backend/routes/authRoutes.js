const express = require('express');
const router = express.Router();
const {
  signup,
  accountActivation,
  signin,
  forgotPassword,
  resetPassword,
  googleLogin,
} = require('../controllers/authController');
const { runValidation } = require('../validators');
const {
  signupValidator,
  signinValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('../validators/auth');

router.post('/signup', signupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', signinValidator, signin);
router.post('/googlelogin', googleLogin);
router.put(
  '/forgotpassword',
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  '/resetpassword',
  resetPasswordValidator,
  runValidation,
  resetPassword
);

module.exports = router;
