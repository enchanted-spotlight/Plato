const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  user_id: String,
  // not sure what notes should be
  notes: String,
  // this should probably be unique for a user
  title: String
});

module.exports = mongoose.model('Note', noteSchema);
