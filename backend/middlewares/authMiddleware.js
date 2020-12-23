const expressJwt = require('express-jwt');

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['sha1', 'RS256', 'HS256'],
});
