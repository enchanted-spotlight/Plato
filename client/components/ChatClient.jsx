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
<<<<<<< 07e5bde58f5ed49bc196fcb604cc5c1656f25771
  componentWillMount() {
    // For now let's hardcode the room and load it here
    // Later we can refactor to user input
    this.state.loadRoom();
=======
  componentDidMount() {
    const main = $('#chat-messages-display')[0];
<<<<<<< e3b66ea8b9ba671a6ce23ee32a656b317a80281e
    main.scrollTop = main.scrollHeight;
>>>>>>> (feat)Chat scroll works properly using jQuery
=======
    $(main).animate({ scrollTop: main.scrollHeight }, 500);
>>>>>>> Refactor to use sockets and local chat with our own db
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
    $(main).animate({ scrollTop: main.scrollHeight }, 2000);
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
            // console.log('MessageObj on chat client: ', messageObj);
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
  messages: () => null
};

export default ChatClientContainer;
