import React from 'react';
import { connect } from 'react-redux';

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
      <div className="signUpContainer">
        <form
          className="signUpForm"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = {
              username: this.state.username,
              password: this.state.password,
              verifyPassword: this.state.verifyPassword
            };
            console.log('SignUp\'s form data: ', formData);
            this.submitSignUp(formData);
          }}
        >
          <input
            type="text"
            onChange={e => this.changeUsernameState(e)}
            placeholder="E-mail"
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

SignUp.propTypes = {
  submitSignUp: React.PropTypes.func
};

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

export default SignUpContainer;
