import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-materialize';

import * as a from './../actions';

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
  submitSignUp: formData => dispatch(a.submitSignUp(formData))
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      verifyPassword: ''
    };

    this.submitSignUp = props.submitSignUp;

    this.submitFormData = (e) => {
      e.preventDefault();
      const formData = {
        username: this.state.username,
        password: this.state.password,
        verifyPassword: this.state.verifyPassword
      };
      this.submitSignUp(formData);
    };
  }

  changeUsernameState(e) {
    this.setState({ username: e.target.value });
  }

  changePasswordState(e) {
    this.setState({ password: e.target.value });
  }

  changeVerifyPasswordState(e) {
    this.setState({ verifyPassword: e.target.value });
  }

  render() {
    return (
      <div className="signUpContainer container">
        <Row>
          <Col s={6} offset="s3">
            <form
              className="signUpForm center-align"
              onSubmit={(e) => { this.submitFormData(e); }}
            >

              <div className="input-field">
                <input
                  type="text"
                  onChange={e => this.changeUsernameState(e)}
                  className="center-align"
                  id="username"
                />
                <label htmlFor="username">
                  E-mail
                </label>
              </div>

              <div className="input-field">
                <input
                  type="password"
                  onChange={e => this.changePasswordState(e)}
                  className="center-align"
                  id="password"
                />
                <label htmlFor="password">
                  Password
                </label>
              </div>

              <div className="input-field">
                <input
                  type="password"
                  onChange={e => this.changeVerifyPasswordState(e)}
                  className="center-align"
                  id="verifyPassword"
                />
                <label htmlFor="verifyPassword">
                  Verify Password
                </label>
              </div>

              <Button type="submit" value="Submit" icon="send" className="yellow darken-2" />
              <div style={{ marginTop: '20px' }}>
                Already have an account? <a href="/login">Login here.</a>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

SignUp.propTypes = {
  submitSignUp: React.PropTypes.func
};

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

export default SignUpContainer;
