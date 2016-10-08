import React from 'react';
import { connect } from 'react-redux';
import { sendChatMessage } from './../actions';

import ChatMessagesDisplay from './ChatMessagesDisplay.jsx';

class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: props.store,
      message: '',
      user: props.username
    };
    console.log('ChatClient constructor state value: ', this.state.store.getState());
  }
  render() {
    return (
      <div className="chat-client-container">
        <ChatMessagesDisplay />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Message input on chat client: ', this.state.message);
            // Form is not properly re rendering after setState
            // Redux conflict? This is a problem with all app's forms
            this.setState({ message: '' });
            console.log('store values? ', this.store.getState());
            const submitObj = {
              user: this.state.user,
              message: this.state.message
            };
            console.log('submit object: ', submitObj);
            this.state.store.dispatch(sendChatMessage(submitObj));
          }}
        >
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ messages: state.messages });
const mapDispatchToProps = dispatch => (
  { onMessageSubmit: messageObj => (
    dispatch(sendChatMessage(messageObj))
  ) }
);
// ChatClient.propTypes = {
//   store: React.PropType.object,
//   username: React.PropType.object
// };

export default ChatClient;
