const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  user_id: String,
  title: String,
  notes: Object,
  transcript: Object
});

module.exports = mongoose.model('Session', sessionSchema);
