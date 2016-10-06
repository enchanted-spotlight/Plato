import React from 'react';
import request from 'superagent';

import * as t from './../actions';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      dispatch: props.dispatcher
    };
  }

  // login the user via /api/auth/login/local
  onFormSubmit(e) {
    e.preventDefault();
    request
      .post('/api/auth/login/local')
      .send({
        username: this.state.username,
        password: this.state.password
      })
      .end((err, res) => {
        if (err) {
          // do something on error
        } else {
          // successful login
          this.props.setUsername(this.state.username);
        }
      });
  }

  changeUsernameState(e) {
    this.setState({ username: e.target.value });
  }

  changePasswordState(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
    <div className="loginContainer">
      <div className="fbLogin">
        <a href="api/auth/login/facebook"> Sign in with Facebook </a>
      </div>

      <div className="twitterLogin">
        <a href="api/auth/login/twitter"> Sign in with Twitter </a>
      </div>
      <form
        className="localLogin"
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
          type="password"
          placeholder="Password"
          onChange={e => this.changePasswordState(e)}
        />
        <input
          type="submit"
        />
      </form>
    </div>
    );
  }
}

LogIn.propTypes = {
  setUsername: React.PropTypes.func,
  dispatcher: React.PropTypes.func
};

export default LogIn;
