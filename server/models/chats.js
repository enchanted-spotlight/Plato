const mongoose = require('mongoose');

const chatMessageSchema = mongoose.Schema({
  user_id: String,
  text: String,
  timestamp: Number
});

const chatRoomSchema = mongoose.Schema({
  room_id: String,
  messages: []
});

module.exports = {
  ChatMessage: mongoose.model('ChatMessage', chatMessageSchema),
  ChatRoom: mongoose.model('ChatRoom', chatRoomSchema)
};
