const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, unique: true }
});

module.exports = mongoose.model('User', userSchema);
