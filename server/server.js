require('dotenv').config();
const slack = require('@slack/client');

const RTM_EVENTS = slack.RTM_EVENTS;

// Require db so it sets up connection
require('./db');
const express = require('express');
const middleware = require('./config/middleware');

// routing modules
const noteRouter = require('./config/routes');

const app = express();
middleware(app, express);

// Slack API integration:
const rtm = require('./rtm-client');
const IncomingWebhooks = slack.IncomingWebhook;
const slackUrl = process.env.SLACK_WEBHOOK_URL;

const wh = new IncomingWebhooks(slackUrl);

// Socket.io setup
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('A user connected via socket.io!');
  const testMessage = {
    type: 'message',
    channel: 'C2KE7FVV3',
    username: 'Jo-Jo',
    text: 'My name is the coolest!',
    ts: '1475865416.000003',
    team: 'T2KE19RLG'
  };
  wh.send(testMessage);

  rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    console.log('A message was captured: ', message);
    const channel = 'C2KE7FVV3';
    socket.emit('incoming slack message', message);
    // rtm.sendMessage('testMessage', channel, (err, msg) => {
    //   // msg.text = 'Updated!';
    // });
  });
});

// routing
app.use('/api', noteRouter);

// initialize server
http.listen(3000, () => {
  console.log('Plato is listening on port 3000 ...');
});


module.exports = app;

