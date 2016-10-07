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
  console.log(`Logged in as`, rtmStartData.self, `of team ${rtmStartData.team.name}, but not yet connected to a channel.`);
});

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
  console.log(`A message was captured: `, message);
  rtm.sendMessage('Dan is smelly!', 'C2KE7FVV3', (err, msg) => {
    msg.text = "Updated!";
  });
});

module.exports = rtm;
