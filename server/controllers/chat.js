const Chat = require('./../rtm-client');

// Controller to send messages from client to slack api
const chatController = {
  sendMessageToSlack(req, res) {
    // const message = req.body.message
    const message = 'Should accept req.body.message in sendMessageToSlack';
    Chat.sendMessage(message, 'C2KE7FVV3', (err, msg) => {
      // What does this call back get as the msg object? err?
      msg.text = 'Updated!';
    });
  },
  sendMessagesToClient() {
    // Maybe have Slack --> client handled in rtm-client.js?
    // Should this emit something and pass value to socket.io?
    // Or use HTML5 push api?
  }
};

module.exports = chatController;
