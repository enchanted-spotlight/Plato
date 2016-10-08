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
<<<<<<< fa303770db1c2615cfa23b03ed7b273a96d293dc
  }

  componentWillMount() {
    request
      .get('/api/auth/identify')
      .end((err, res) => {
        console.log(res.body);
        this.setState({
          username: res.body.email,
        });
        this.state.dispatch(t.loginUser, this.state.username);
        this.state.dispatch(t.fetchNotes, this.state.username);
      });
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
=======
    this.changeUsernameState = (e) => {
      this.setState({ username: e.target.value });
    };
    this.changePasswordState = (e) => {
      this.setState({ password: e.target.value });
    };
>>>>>>> Set up Login form with provider and slight style changes
  }

  render() {
    return (
      <div className="loginContainer">
        <h3>Login:</h3>

        <div className="fb-login">
          <a href="api/auth/login/facebook"> Sign in with Facebook </a>
        </div>
<<<<<<< fa303770db1c2615cfa23b03ed7b273a96d293dc
        <div className="twitterLogin">
          <a href="api/auth/login/twitter"> Sign in with Twitter </a>
        </div>

        <div className="slackLogin">
          <a href="api/auth/login/slack"> Sign in with Slack </a>
        </div>

        <div className="googleLogin">
          <a href="api/auth/login/google"> Sign in with Google </a>
        </div>
=======

        <div className="twitter-login">
          <a href="api/auth/login/twitter"> Sign in with Twitter </a>
        </div>

>>>>>>> Set up Login form with provider and slight style changes
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
