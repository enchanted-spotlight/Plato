import React from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import { Row, Col } from 'react-materialize';

import * as t from './../actions';

const mapStateToProps = state => ({
  isSignedIn: state.signInStatus
});

const mapDispatchToProps = dispatch => ({
  onUsernameSubmit: formData => dispatch(t.loginUser(formData)),
  getIdentity: () => dispatch(t.getIdentity()),
  hasSignedIn: bool => dispatch(t.setSignIn(bool))
});

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    if (this.props.isSignedIn) {
      this.props.hasSignedIn(false);
    }

    this.changeUsernameState = (e) => {
      this.setState({ username: e.target.value });
    };
    this.changePasswordState = (e) => {
      this.setState({ password: e.target.value });
    };

    // css styling to control size of the login buttons
    this.loginButtonStyle = {
      height: '32px',
      width: '32px',
      margin: '2px',
      border: '0',
      background: 'transparent'
    };
  }

  componentWillMount() {
    this.props.getIdentity();
  }
  /* eslint-disable */
  render() {
    return (
      <div className="loginContainer container">
        <Row className="center-align">
              <h3>Login</h3>
              <a href="/api/auth/login/facebook" >
                  <img src="./styles/images/fb_icon.png" style={this.loginButtonStyle} />
              </a>
              <a href="api/auth/login/google">
                  <img src="./styles/images/google_icon.png" style={this.loginButtonStyle} />
              </a>
        </Row>

        <Row className="center-align">
          <Col s={6} offset="s3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  username: this.state.username,
                  password: this.state.password
                };
                this.props.onUsernameSubmit(formData);
              }}
              className="center-align"
            >
              <div className="input-field">
                <input
                  type="email"
                  value={this.state.username}
                  onChange={this.changeUsernameState}
                  className="center-align"
                  id="email"
                />
                <label htmlFor="email">
                  E-mail
                </label>
              </div>

              <div className="input-field">
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.changePasswordState}
                  className="center-align"
                />
                <label htmlFor="Password">
                  Password
                </label>
              </div>

              <input type="submit" />

            </form>
          </Col>
        </Row>

      </div>
    );
  }
}
/* eslint-enable */

LogIn.propTypes = {
  isSignedIn: React.PropTypes.boolean,
  hasSignedIn: React.PropTypes.func,
  onUsernameSubmit: React.PropTypes.func,
  getIdentity: React.PropTypes.func
};

const LogInContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);

export default LogInContainer;
