const User = require('../models/userModel');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Email already exist' });
    }
    user = await new User({ name, email, password }).save();

    res
      .status(201)
      .json({ msg: 'User Signed Up successfully! Please Sign in', data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Server Error' });
  }
};
