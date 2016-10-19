'use strict';

let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('../../config/config');
let User = mongoose.model('User');
let bcrypt = require('bcryptjs');

let auth = {
// Function for verifying a users registration and
// generating a JWT on successful login.
  login: function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if(err) {
        res.status(500).json({
          authenticated: false,
          error: err,
          message: 'Sorry, there was a server error.'
        });
      }
      // If user does not exist
      if (!user) {
        res.status(404).json({
          authenticated: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {
        // If user exists but password is wrong
        if (!verifyPasswords(req.body.password, user.password)) {
          res.status(404).json({
            authenticated: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {  // If everything checks out
          let token = jwt.sign(user, config.secret, {
            expiresIn: '24h'
          });
          res.status(200).json({
            authenticated: true,
            message: 'Authentication successful.',
            token: token,
            user: user
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
        res.status(500).json({
          authenticated: false,
          error: err,
          message: 'Sorry, there was a server error.'
        });
      }

      if (!registeredUser) {
        var body = req.body;
        if (body.name && body.email && body.password) {
          var user = new User();
          user.name = body.name;
          user.email = body.email;
          user.password = encryptPassword(body.password);
          user.avatar = body.avatar;
          user.provider = body.provider;

          user.save( function (err) {
            if (err) {
              res.status(500).json({
                authenticated: false,
                error: err,
                message: 'Sorry, there was a server error.'
              });
            }
            var token = jwt.sign(user, config.secret, { expiresIn: '24h' });

            res.status(201).json({
              authenticated: true, 
              message: 'You have successfully signed up.', 
              token: token,
              user: user
            });
          });
        } else {
          res.status(400).json({
            authenticated: false,
            message: 'Signup details are incomplete.'
          });
        }
      } else {
        res.status(400).json({
          authenticated: false,
          message: 'User already exists.'
        });
      }
    });
  },

  delete: function (req, res) {
    User.remove({name: req.body.name}, function (err) {
      if (err) {
        res.json(err);
      }
      res.json({
        message: 'User deleted!'
      });
    });
  },

  social: function(req, res) {
    User.findOne({
      email: req.body.email
    }, function (err, registeredUser) {
      if (err) {
        res.status(500).json({
          authenticated: false,
          error: err,
          message: 'Sorry, there was a server error.'
        });
      }

      if (!registeredUser) {
        var body = req.body;
        if (body.name && body.email && body.provider) {
          var user = new User();
          user.name = body.name;
          user.email = body.email;
          user.password = encryptPassword(body.password);
          user.provider = body.provider;
          user.save( function (err, savedUser) {
            if (err) {
              res.status(500).json({
                authenticated: false,
                error: err,
                message: 'Sorry, there was a server error.'
              });
            }
            var token = jwt.sign(savedUser, config.secret, { expiresIn: '24h' });
            res.status(200).json({
              authenticated: true, 
              message: 'You have successfully signed up.', 
              token: token,
              user: savedUser
            });
          });
        } else {
          res.status(400).json({
            authenticated: false,
            message: 'Signup details are incomplete.'
          });
        }
      } else {
        var token = jwt.sign(registeredUser, config.secret, { expiresIn: '24h' });
        res.status(200).json({
          authenticated: true, 
          message: 'You have been authenticated.', 
          token: token,
          user: registeredUser
        });
      }
    });
  }
};

function encryptPassword (password) {
  if (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
  return '';
}

function verifyPasswords(plainText, hashedPassword) {
  if (!plainText || !hashedPassword) {
    return false;
  }
  return bcrypt.compareSync(plainText, hashedPassword);
}

module.exports = auth;
