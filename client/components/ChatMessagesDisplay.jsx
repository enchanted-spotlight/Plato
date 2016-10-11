import React from 'react';
import Infinite from 'react-infinite';

const ChatMessagesDisplay = props => (
  <Infinite
    containerHeight={350}
    elementHeight={30}
    className="chat-messages-display"
    displayBottomUpwards
  >
    {props.messages.map(msg => <div>{msg.username}: {msg.text}</div>)}
  </Infinite>
);

ChatMessagesDisplay.propTypes = {
  messages: React.PropTypes.array
};

export default ChatMessagesDisplay;
