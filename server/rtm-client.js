const slack = require('@slack/client');

const RtmClient = slack.RtmClient;
const CLIENT_EVENTS = slack.CLIENT_EVENTS;
const RTM_EVENTS = slack.RTM_EVENTS;

const token = process.env.SLACK_API_TOKEN || '';
const rtmOptions = {
  // logLevel: 'debug'
};
const channel = 'C2KE7FVV3';
const rtm = new RtmClient(token, rtmOptions);


// Slack has rate limited us so let's not start it for a while
// rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  console.log(
    'Logged in as',
    rtmStartData.self.name,
    `of team ${rtmStartData.team.name},
    but not yet connected to a channel.`
  );
});

module.exports = rtm;
