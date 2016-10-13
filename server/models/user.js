const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  facebookId: String,
  TwitterId: String,
  slackId: String,
  slackToken: String,
  googleId: String

});

module.exports = mongoose.model('User', userSchema);
