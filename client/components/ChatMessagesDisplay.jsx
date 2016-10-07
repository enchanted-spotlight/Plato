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
      <li>User: Message</li>
    </ul>
  </div>
);

export default ChatMessagesDisplay;
