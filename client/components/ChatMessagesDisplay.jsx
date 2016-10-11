import React from 'react';

const ChatMessagesDisplay = props => (
  <ul
    id="chat-messages-display"
  >
    {props.messages.map(msg => <li>{msg.username}: {msg.text}</li>)}
    <li id="chat-messages-display-bottom" />
  </ul>
);

ChatMessagesDisplay.propTypes = {
  messages: React.PropTypes.array
};

export default ChatMessagesDisplay;
