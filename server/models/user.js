const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  facebookId: String,
  TwitterId: String,
});

module.exports = mongoose.model('User', userSchema);
