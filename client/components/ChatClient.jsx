import React from 'react';

class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }
  render() {
    return (
      <div className="chat-client-container">
        <ChatMessages />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Message input on chat client: ', this.state.message);
            this.setState({ message: '' });
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
