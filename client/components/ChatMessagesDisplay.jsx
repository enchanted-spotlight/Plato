import React from 'react';

const ChatMessagesDisplay = props => (
  <div
    className="chat-messages-display"
  >
    <h2>Chat:</h2>
    {/*
      map over messages retrieved from slack in props
    */}
    <ul>
      {props.messages.map(msg => <li>{msg.username}: {msg.text}</li>)}
    </ul>
  </div>
);

ChatMessagesDisplay.propTypes = {
  messages: React.PropTypes.array
};

export default ChatMessagesDisplay;
