'use strict';

let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('../../config/config');
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
      // If user does not exist
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {
        // If user exists but password is wrong
        if (!user.authenticate(req.body.password)) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {  // If everything checks out
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
  },

  signup: function (req, res) {
    User.findOne({
      email: req.body.email
    }, function (err, registeredUser) {
      if (err) {
        throw err;
      }

      if (!registeredUser) {
        var body = req.body;
        if (body.name && body.email && body.password) {
          var user = new User();
          user.name = body.name;
          user.email = body.email;
          user.password = body.password;
          user.avatar = body.avatar;

          user.save( function (err) {
            if (err) {
              res.send(err);
            }

            var token = jwt.sign(user, config.secret, {expiresIn: 60*60*24});

            res.json({successful: true, message: 'You have successfully signed up', token: token});

          });
        } else {
          res.send({message: 'Signup details are incomplete'});
        }
      } else {
        res.send({message: 'User already exists.'});
      }
    });
  },
  delete: function (req, res) {
    User.remove({name: req.body.name}, function (err) {
      if (err) {
        res.send(err);
      }

      res.send({message: 'User deleted!'});
    });
  }
};

module.exports = auth;
