const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  // user_id should correspond with the email of the user who created the note
  user_id: String,
  // notes should be an object (EntityMap)
  text: Object,
  // plainTextContent should be a string
  plainTextContent: { type: String, text: true },
  // this should probably be unique for a user
  title: String
});

module.exports = mongoose.model('Note', noteSchema);
