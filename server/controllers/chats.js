const Chat = require('./../rtm-client');

// Controller to send messages from client to slack api
const chatController = {
  sendMessageToSlack(req, res) {
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
  sendMessagesToClient() {
    // Maybe have Slack --> client handled in rtm-client.js?
    // Should this emit something and pass value to socket.io?
    // Or use HTML5 push api?
  }
};

module.exports = chatController;
