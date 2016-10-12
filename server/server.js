require('dotenv').config();
const slack = require('@slack/client');
const request = require('superagent');
const path = require('path');

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
const slackAPIUrl = 'https://slack.com/api/';
const token = process.env.SLACK_API_TOKEN || '';
const channel = 'C2KE7FVV3';

const wh = new IncomingWebhooks(slackUrl);

// Socket.io setup
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  // socket connection will be initiated when chat is opened
  // on connection, we will get channel message history
  const endpoint = 'channels.history';
  request
    .get(slackAPIUrl + endpoint)
    .query({ token })
    .query({ channel })
    .query({ pretty: 1 })
    .end((err, res) => {
      // send array of messages to client to fill out chat
      // console.log('superagent messages response: ', res.text);
      socket.emit('slack message archive', res.text);
    });

  console.log('A user connected via socket.io!');

  rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    console.log('A message was captured: ', message);
    socket.emit('incoming slack message', message);
  });
});

// const ensureAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     console.log('Is this going through the /dashboard get?????');
//     return next();
//   }
//   console.log('You are not authenticated');
//   res.redirect('/login');
// };

// routing
app.use('/api', noteRouter);

app.get('/*', (req, res) => {
  res.sendfile(path.join(__dirname, '/../client/index.html'));
});

// initialize server
http.listen(3000, () => {
  console.log('Plato is listening on port 3000 ...');
});

module.exports = app;
