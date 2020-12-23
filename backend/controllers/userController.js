const User = require('../models/userModel');

//@desc     Get User By id
//@route    GET /api/v1/user/:id
//@access   Private
exports.getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something Went Wrong', error: err });
  }
};

//@desc     Update User
//@route    PUT /api/v1/user/update
//@access   Private
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.name = req.body.name || user.name;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      return res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      return res.status(400).json({ error: 'User not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something Went Wrong', error: err });
  }
};
