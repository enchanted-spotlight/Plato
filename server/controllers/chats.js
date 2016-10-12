const sanitizeHtml = require('sanitize-html');

const Chat = require('./../rtm-client');
const ChatModels = require('./../models/chats');

// Controller to send messages from client to slack api
const chatController = {
  sendMessageToSlack(req, res) {
    // Will need to get user slack token at some point
    console.log('request arrived to sendMessageToSlack. req.body: ',
      req.body);
    const message = req.body.message;
    // const message = 'Should accept req.body.message in sendMessageToSlack';
    Chat.sendMessage(message, 'C2KE7FVV3', (err, msg) => {
      // What does this call back get as the msg object? err?
      msg.text = 'Updated!';
      res.status(200).send(msg);
    });
  },
  sendMessagesToClient(req, res) {
    // Maybe have Slack --> client handled in rtm-client.js?
    // Should this emit something and pass value to socket.io?
    // Or use HTML5 push api?
  },
  sendMessageToDatabase(socket, data) {
    // sanitize the message before saving!
    console.log('chat.controller sendMessageToDatabase data: ', data);
    // const chatMessage = new ChatModels.ChatMessage(data);
    // console.log('sanitized html version: ', sanitized);
    const query = { room_id: data.room_id };
    const update = { $push: { messages: {
      user_id: data.user_id,
      text: sanitizeHtml(data.text),
      timestamp: data.timestamp
    } } };
    const options = {
      new: true,
      upsert: true
    };
    const callback = (err, result) => {
      const mostRecent = result.messages[result.messages.length - 1];
      console.log('Most recent message to be broadcast: ', mostRecent);
      socket.broadcast.emit('incoming chat message', mostRecent);
    };
    ChatModels.ChatRoom.findOneAndUpdate(query, update, options, callback);
  },
  loadChatRoomFromDatabase(socket, room) {
    // console.log('loadMessagesFromDatabase called');
    const query = { room_id: room };
    ChatModels.ChatRoom.find(query, (err, data) => {
      // console.log('chatRoom from db results: ', data);
      if (data[0] === undefined) {
        return;
      }
      socket.emit('chat room archive', data[0].messages);
    });
  }
};

module.exports = chatController;
