const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  user_id: String,
  title: String,
  notesText: Object,
  notesPlainText: { type: String, text: true },
  transcriptText: Object,
  transcriptPlainText: { type: String, text: true },
  canvas: Object
});

module.exports = mongoose.model('Session', sessionSchema);
