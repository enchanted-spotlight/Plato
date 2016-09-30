import React from 'react';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  render() {
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
