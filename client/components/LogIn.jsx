import React from 'react';
import { connect } from 'react-redux';

import * as t from './../actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onUsernameSubmit: formData => dispatch(t.loginUser(formData))
});

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.changeUsernameState = (e) => {
      this.setState({ username: e.target.value });
    };
    this.changePasswordState = (e) => {
      this.setState({ password: e.target.value });
    };
  }

  render() {
    return (
      <div className="loginContainer">
        <h3>Login:</h3>

        <div className="fb-login">
          <a href="api/auth/login/facebook"> Sign in with Facebook </a>
        </div>

        <div className="twitter-login">
          <a href="api/auth/login/twitter"> Sign in with Twitter </a>
        </div>

        <form
          className="local-login"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = {
              username: this.state.username,
              password: this.state.password
            };
            this.props.onUsernameSubmit(formData);
          }}
        >
          <input
            type="text"
            value={this.state.username}
            onChange={this.changeUsernameState}
          />
          <input
            type="password"
            value={this.state.password}
            onChange={this.changePasswordState}
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
  onUsernameSubmit: React.PropTypes.func,
};

const LogInContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);

export default LogInContainer;
