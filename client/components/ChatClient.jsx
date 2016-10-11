import React from 'react';
import { connect } from 'react-redux';

import { sendChatMessage } from './../actions';
import ChatMessagesDisplay from './ChatMessagesDisplay.jsx';

const mapStateToProps = state => ({
  messages: state.chatMessages,
  username: state.username
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
  componentWillReceiveProps(newProps) {
    if (this.props.username !== newProps.username) {
      this.setState({
        username: newProps.username
      });
    }
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
            // Form is not properly re rendering after setState
            // Redux conflict? This is a problem with all app's forms
            const messageObj = {
              username: this.state.username,
              text: this.state.message,
              type: 'message'
            };
            console.log('MessageObj on chat client: ', messageObj);
            this.state.onMessageSubmit(messageObj);
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
  messages: () => null
};

export default ChatClientContainer;
