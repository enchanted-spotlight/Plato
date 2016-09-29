import React from 'react';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  // onInputChange(e) {
  //   console.log(e.target.value, 'e');
  //   this.setState({ username: e.target.value });
  //   console.log(this.state, 'state');
  // }

  // onFormSubmit(e) {
  //   e.preventDefault();
  //   console.log('executed', this.state.username);
  //   this.props.fetchNotes(this.state.username);
  //   console.log('executedd', this.state.username);
  // }


  render() {
    console.log(this.props, 'props');
    return (
      <form
        className="login"
        onSubmit={e => this.props.fetchNotes(e)}
      >
        <h3>Login:</h3>
        <input
          type="text"
          name="username"
          onChange={e => this.props.loginHandler(e)}
        />
        <input type="submit" />
      </form>
    );
  }
}

LogIn.propTypes = {
  fetchNotes: React.PropTypes.func,
  loginHandler: React.PropTypes.func
};

export default LogIn;
