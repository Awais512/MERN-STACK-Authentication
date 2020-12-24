const expressJwt = require('express-jwt');
const User = require('../models/userModel');

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['sha1', 'RS256', 'HS256'],
});

exports.isAdmin = (req, res, next) => {
  User.findById({ _id: req.user.id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Admin resource. Access denied.',
      });
    }

    req.profile = user;
    next();
  });
};
