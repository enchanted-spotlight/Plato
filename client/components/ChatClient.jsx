import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import socket from './../socket.js';
import { loadNewChatMessage } from './../actions';
import ChatMessagesDisplay from './ChatMessagesDisplay.jsx';

const mapStateToProps = state => ({
  messages: state.chatMessages,
  username: state.username
});

const mapDispatchToProps = dispatch => ({
  onMessageSubmit: (messageObj) => {
    dispatch(loadNewChatMessage(messageObj));
    socket.emit('new chat message', messageObj);
  },
});

class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRoom: '',
      loadRoom:
        chatRoom => socket.emit('load chat room', this.state.chatRoom),
      message: '',
      ...props
    };
  }
  componentWillMount() {
    this.state.loadRoom();
  }
  componentWillReceiveProps(newProps) {
    if (this.props.username !== newProps.username) {
      this.setState({
        username: newProps.username
      });
    }
  }
  componentDidUpdate() {
    const main = $('#chat-messages-display')[0];
    if (main.scrollHeight > 450) {
      $(main).animate({ scrollTop: main.scrollHeight }, 2000);
    }
  }
  render() {
    return (
      <div className="chat-client-container">
        <form
          className="chat-room-select"
          onSubmit={(e) => {
            e.preventDefault();
            this.state.loadRoom();
            this.setState({ chatRoom: '' });
          }}
        >
          <label
            htmlFor="chat-room-select-input"
          >
            room:
          </label>
          <input
            name="chat-room-select-input"
            type="text"
            placeholder="test room 1"
            value={this.state.chatRoom}
            onChange={e => this.setState({ chatRoom: e.target.value })}
          />
        </form>
        <p>Chat:</p>
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
              room_id: this.state.chatRoom,
              user_id: this.state.username,
              text: this.state.message,
              timestamp: Date.now()
            };
            console.log('MessageObj on chat client: ', messageObj);
            this.state.onMessageSubmit(messageObj);
            this.setState({ message: '' });
          }}
        >
          <label
            htmlFor="chat-message-input"
          >
            message:
          </label>
          <input
            name="chat-message-input"
            type="text"
            placeholder="start typing..."
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
  username: React.PropTypes.String,
  messages: () => null
};

export default ChatClientContainer;
