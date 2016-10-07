import React from 'react';
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
            const submitObj = {
              user: this.state.user,
              message: this.state.message
            };
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

export default ChatClient;
