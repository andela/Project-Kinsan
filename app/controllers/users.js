/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User');
var avatars = require('./avatars').all();

/**
 * Auth callback
 */
exports.authCallback = function (req, res) {
  res.redirect('/chooseavatars');
};

/**
 * Show login form
 */
exports.signin = function (req, res) {
  if (!req.user) {
    res.redirect('/#!/signin?error=invalid');
  } else {
    res.redirect('/#!/app');
  }
};

/**
 * Show sign up form
 */
exports.signup = function (req, res) {
  if (!req.user) {
    res.redirect('/#!/signup');
  } else {
    res.redirect('/#!/app');
  }
};

/**
 * Logout
 */
exports.signout = function (req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * Session
 */
exports.session = function (req, res) {
  res.redirect('/');
};

/** 
 * Check avatar - Confirm if the user who logged in via passport
 * already has an avatar. If they don't have one, redirect them
 * to our Choose an Avatar page.
 */
exports.checkAvatar = function (req, res) {
  if (req.user && req.user._id) {
    User.findOne({
        _id: req.user._id
      })
      .exec(function (err, user) {
        if (user.avatar !== undefined) {
          res.redirect('/#!/');
        } else {
          res.redirect('/#!/choose-avatar');
        }
      });
  } else {
    // If user doesn't even exist, redirect to /
    res.redirect('/');
  }

};

/**
 * Create user
 */
exports.create = function (req, res, next) {
  if (req.body.name && req.body.password && req.body.email) {
    User.findOne({
      email: req.body.email
    }).exec(function (err, existingUser) {
      if (!existingUser) {
        var user = new User(req.body);
        // Switch the user's avatar index to an actual avatar url
        user.avatar = avatars[user.avatar];
        user.provider = 'local';
        user.save(function (err) {
          if (err) {
            return res.render('/#!/signup?error=unknown', {
              errors: err.errors,
              user: user
            });
          }
          req.logIn(user, function (err) {
            if (err) return next(err);
            return res.redirect('/#!/');
          });
        });
      } else {
        return res.redirect('/#!/signup?error=existinguser');
      }
    });
  } else {
    return res.redirect('/#!/signup?error=incomplete');
  }
};

/**
 * Assign avatar to user
 */
exports.avatars = function (req, res) {
  // Update the current user's profile to include the avatar choice they've made
  if (req.user && req.user._id && req.body.avatar !== undefined &&
    /\d/.test(req.body.avatar) && avatars[req.body.avatar]) {
    User.findOne({
        _id: req.user._id
      })
      .exec(function (err, user) {
        user.avatar = avatars[req.body.avatar];
        user.save();
      });
  }
  return res.redirect('/#!/app');
};

exports.addDonation = function (req, res) {
  if (req.body && req.user && req.user._id) {
    // Verify that the object contains crowdrise data
    if (req.body.amount && req.body.crowdrise_donation_id && req.body.donor_name) {
      User.findOne({
          _id: req.user._id
        })
        .exec(function (err, user) {
          // Confirm that this object hasn't already been entered
          var duplicate = false;
          for (var i = 0; i < user.donations.length; i++) {
            if (user.donations[i].crowdrise_donation_id === req.body.crowdrise_donation_id) {
              duplicate = true;
            }
          }
          if (!duplicate) {
            user.donations.push(req.body);
            user.premium = 1;
            user.save();
          }
        });
    }
  }
  res.send();
};

/**
 *  Show profile
 */
exports.show = function (req, res) {
  var user = req.profile;

  res.render('users/show', {
    title: user.name,
    user: user
  });
};

/**
 * Send User
 */
exports.me = function (req, res) {
  res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function (req, res, next, id) {
  User
    .findOne({
      _id: id
    })
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    });
};


/**
 * Find all friends
 */
exports.getFriends = function (req, res) {
  User
    .findOne({
      _id: req.params.id
    }, 'friends')
    .populate('friends', 'name')
    .exec(function (err, friends) {
      if (err) {
        res.json(err);
      }
      res.json(friends);
    });
};

/**
 * Get all user, excluding the current user
 */
exports.getUsers = function (req, res) {
  User
    .find().select('_id name').where('_id').ne(req.params.id)
    .exec(function (err, users) {
      if (err) {
        res.json(err);
      }
      res.json(users);
    });
};

/**
 * add friend
 */
exports.addFriend = function (req, res) {
  User.findOne({ _id: req.params.id })
    .exec(function (err, user) {
      if (err) res.json(err);
      User.findOne({ name: req.params.username })
        .exec((err, friend) => {
          if (err) {
            res.json({ error: 'Failed to add friend.' });
          } else if (!friend) {
            res.send({
              status: 'Friend not found',
              message: req.params.username + ' is not a registered player.'
            });
          } else if (user.friends.indexOf(friend._id) >= 0) {
            res.send({
              status: 'Friend already exists',
              message: friend.name + ' is already your friend.'
            });
          } else {
            user.friends.push(friend._id);
            user.save();
            res.send({ status: 'Friend added successfully', message: 'You have added ' + friend.name + ' as your friend.' });
          }
        });
    });
};

/**
 * delete friend
 */
exports.removeFriend = function (req, res) {
  User.findOne({ _id: req.params.id })
    .exec(function (err, user) {
      if (err) res.json(err);
      User.findOne({ username: req.body.username }, '_id')
        .then((err, userId) => {
          if (err) res.json({ error: 'Failed to delete friend.' });
          let position = user.friends.indexOf([userId]);
          if (position !== -1) {
            user.friends.splice(position, 1);
            res.json({ success: 'Friend added successfully' });
          }
        });
    });
};