import React from 'react';

const ChatMessagesDisplay = props => (
  <ul
    id="chat-messages-display"
  >
    {props.messages.map(msg => <li>{msg.user_id}: {msg.text}</li>)}
  </ul>
);

ChatMessagesDisplay.propTypes = {
  messages: React.PropTypes.array
};

export default ChatMessagesDisplay;
