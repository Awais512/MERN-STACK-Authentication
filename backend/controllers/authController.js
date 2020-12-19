const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
