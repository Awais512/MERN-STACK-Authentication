const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
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
      return res.status(400).json({
        error: 'Email is taken',
      });
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
    res.json({ message: err.message });
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
    res.status(500).json({ error: 'Something Went Wrong', error: err });
  }
};

//@desc     Sign into the Account
//@route    POST /api/v1/auth/signin
//@access   Public
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: 'Email does not exist! Please sign up first' });
    }
    //authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({ error: 'Email or Password do not match' });
    }

    //Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    const { _id, name, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something Went Wrong', error: err });
  }
};

//@desc     Forgot Password
//@route    PUT /api/v1/auth/forgotpassword
//@access   Public
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: 'User with this email does not exist' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: '10m',
    });
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset Link`,
      html: `
        <h1>Please use the following link to Reset your Password</h1>
        <p>${process.env.CLIENT_URL}/auth/forgotpassword/${token}</p>
        <hr />
        <p>Email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `,
    };

    return user.updateOne({ resetPasswordLink: token }, (err) => {
      if (err) {
        return res.status(400).json({ error: 'Connection Error' });
      } else {
        sgMail
          .send(emailData)
          .then((sent) => {
            return res.json({
              message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
            });
          })
          .catch((err) => console.log(err));
      }
    });
  } catch (error) {
    console.log(err.response.body);
    res.json({ message: err.message });
  }
};

//@desc     Reset Password
//@route    PUT /api/v1/auth/resetpassword
//@access   Public
exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, decoded) {
        if (err) {
          return res.status(400).json({
            error: 'Expired link. Try again',
          });
        }

        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: 'Something went wrong. Try later',
            });
          }

          const updatedFields = {
            password: newPassword,
            resetPasswordLink: '',
          };

          user = _.extend(user, updatedFields);

          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: 'Error resetting user password',
              });
            }
            res.json({
              message: `Great! Now you can login with your new password`,
            });
          });
        });
      }
    );
  }
};
