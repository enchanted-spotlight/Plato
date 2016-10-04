import React from 'react';
import * as t from './../actions';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      dispatch: props.dispatcher
    };
  }

  onInputChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <form
        className="login"
        onSubmit={(e) => {
          console.log('onsubmit state: ', this.state);
          e.preventDefault();
          // Dispath this.state.username so that store is updated
          this.state.dispatch(t.loginUser, this.state.username);
          this.state.dispatch(t.fetchNotes, this.state.username);
          this.setState({ username: '' });
        }}
      >
        <h3>Login:</h3>
        <input
          type="text"
          onChange={
            e => this.setState({ username: e.target.value })
          }
        />
        <input
          type="submit"
        />
      </form>
    );
  }
}

LogIn.propTypes = {
  fetchNotes: React.PropTypes.func
};

export default LogIn;
