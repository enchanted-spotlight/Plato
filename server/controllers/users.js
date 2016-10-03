const bcrypt = require('bcrypt');
const User = require('../models/user');

const userController = {
  signUp: (req, res) => {
    // we should be taking the user's username and password
    // store into the database as username & hashed password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        res.status(500).send();
      } else {
        const newUser = new User({
          // save as uppercase for case-insensitive login
          name: req.body.username.toUpperCase(),
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
  }
};

module.exports = userController;
