const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  // user_id should correspond with the mongodb _id of the user
  user_id: String,
  // not sure what notes should be
  notes: String,
  // this should probably be unique for a user
  title: String
});

module.exports = mongoose.model('Note', noteSchema);
