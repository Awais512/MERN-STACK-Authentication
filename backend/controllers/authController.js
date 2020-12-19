const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//@desc     Register User
//@route    POST /api/v1/auth/signup
//@access   Public
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Email already exist' });
    }

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: '10m' }
    );
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account Activation Link`,
      html: `
        <h1>Please use the following link to activate your account</h1>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        <hr />
        <p>Email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `,
    };
    const sent = await sgMail.send(emailData);

    res.json({
      message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
    });
  } catch (err) {
    console.log(err.response.body);
    res.status(500).json({ err: 'Server Error' });
  }
};

//@desc     Activate Account
//@route    POST /api/v1/auth/activate
//@access   Public
exports.accountActivation = async (req, res) => {
  const { token } = req.body;

  try {
    if (token) {
      jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);
      const { name, email, password } = jwt.decode(token);
      const user = await new User({ name, email, password }).save();
      return res.json({
        message: 'Signedup Successfully! Please Sign In',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Something Went Wrong', error: err });
  }
};
