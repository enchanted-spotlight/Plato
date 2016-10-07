const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

const userController = {
  signUp: (req, res) => {
    // we should be taking the user's username and password
    // store into the database as username & hashed password
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send();
      } else {
        const newUser = new User({
          // save as uppercase for case-insensitive login
          email: req.body.username.toUpperCase(),
          password: hash
        });

        newUser.save((err2, success) => {
          if (err2) {
            res.status(500).send();
          } else {
            res.status(200).send();
          }
        });
      }
    });
  },
  identifyUser: (req, res) => {
    User.findOne({ _id: req.session.passport.user }, (err, user) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(200).send(user);
      }
    });
  }
};

module.exports = userController;
