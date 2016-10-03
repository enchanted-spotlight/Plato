import React from 'react';
import request from 'superagent';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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

        <form className="localLogin" onSubmit={e => this.onFormSubmit(e)}>
          <input type="text" placeholder="Username" onChange={e => this.changeUsernameState(e)} />
          <input type="password" placeholder="Password" onChange={e => this.changePasswordState(e)} />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

LogIn.propTypes = {
  setUsername: React.PropTypes.func
};

export default LogIn;
