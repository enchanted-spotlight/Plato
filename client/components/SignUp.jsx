import React from 'react';
import request from 'superagent';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      verifyPassword: ''
    };
  }

  changeUsernameState(e) {
    this.setState({ username: e.target.value });
  }

  changePasswordState(e) {
    this.setState({ password: e.target.value });
  }

  // form validation
  verifyPassword() {
    if (this.state.password === this.state.verifyPassword) {
      request
        .post('/api/auth/signup')
        .send({
          username: this.state.username,
          password: this.state.password
        })
        .end((err, res) => {
          if (err) {
            // error handling
          }
        });
    } else {
      // passwords don't match, throw error here
    }
  }

  render() {
    return (
      <div className="signUpContainer">
        <form className="signUpForm">
          <input
            type="text"
            onChange={e => this.changeUsernameState(e)}
            placeholder="Username"
          />
          <input
            type="password"
            onChange={e => this.changePasswordState(e)}
            placeholder="Password"
          />
          <input
            type="password"
            onChange={e => this.changeVerifyPasswordState(e)}
            placeholder="Verify Password"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
