import React from 'react';
import { connect } from 'react-redux';
import { sendChatMessage } from './../actions';

import ChatMessagesDisplay from './ChatMessagesDisplay.jsx';

const mapStateToProps = state => ({
  username: state.username,
  messages: state.chatMessages
});

const mapDispatchToProps = dispatch => ({
  onMessageSubmit: messageObj => (
    dispatch(sendChatMessage(messageObj))
  )
});

class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      ...props
    };
  }
  render() {
    return (
      <div className="chat-client-container">
        <h2>Chat:</h2>
        <ChatMessagesDisplay
          messages={this.props.messages}
        />
        <form
          className="chat-client-input"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Message input on chat client: ', this.state.message);
            // Form is not properly re rendering after setState
            // Redux conflict? This is a problem with all app's forms
            this.setState({ message: '' });
          }}
        >
          <input
            type="text"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
          />
        </form>
      </div>
    );
  }
}

const ChatClientContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatClient);

ChatClient.propTypes = {
  messages: React.PropType.array,
};

export default ChatClientContainer;
