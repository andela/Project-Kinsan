const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./../../config/config');

// Load user model
let User = mongoose.model('User');

let auth = {
  // Function for verifying a users regiatration and
  // generating a JWT on successful login.
  login: function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if(err) {
        res.send(err);
      }
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {
        if (!user.authenticate(req.body.password)) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {
          let token = jwt.sign(user, config.secret, {
            expiresIn: '24h'
          });

          res.json({
            success: true,
            message: 'Authentication successful.',
            token: token
          });
        }
      }
    });
  }
};

module.exports = auth;