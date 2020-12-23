const User = require('../models/userModel');

//@desc     Get User By id
//@route    GET /api/v1/user/:id
//@access   Public
exports.getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something Went Wrong', error: err });
  }
};
