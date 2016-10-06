require('dotenv').config();

// Require db so it sets up connection
require('./db');
const express = require('express');
const middleware = require('./config/middleware');
// routing modules

const noteRouter = require('./config/routes');


const app = express();
middleware(app, express);

// routing
app.use('/api', noteRouter);

// initialize server
app.listen(3000, () => {
  console.log('Plato is listening on port 3000 ...');
});

module.exports = app;

// Slack API integration:

const slack = require('@slack/client');
const RtmClient = slack.RtmClient;
const CLIENT_EVENTS = slack.CLIENT_EVENTS;
const RTM_EVENTS = slack.RTM_EVENTS;

const token = process.env.SLACK_API_TOKEN || '';

const rtmOptions = {
  // logLevel: 'debug'
};

const rtm = new RtmClient(token, rtmOptions);
rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel.`);
});

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
  console.log(`A message was captured: `, message);
  rtm.sendMessage('rtm.sendMessage function', 'C2KE7FVV3', (err, msg) => {
    msg.text = "Updated!";
  });
});

