const User = require("../models/User");

exports = module.exports = req => {
  if (req.session.userId) return true;
  return false;
};

exports.auth = function(user, password) {
  return User.findOne({
    username: user,
    password: password
  }).then(user => {
    if (!user) return false;
    return user;
  });
};
