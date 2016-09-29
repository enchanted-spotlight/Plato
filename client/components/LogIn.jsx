import React from 'react';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
    this.onInputChange = (e) => {
      this.setState({ username: e.target.value });
    };
    this.onFormSubmit = (e) => {
      e.preventDefault();
      console.log('executed');
      this.props.fetchNotes(this.state.username);
    };
  }

  render() {
    return (
      <form
        className="login"
        onSubmit={e => this.onFormSubmit(e)}
      >
        <h3>Login:</h3>
        <input
          type="text"
          onChange={e => this.onInputChange(e)}
        />
        <input type="submit" />
      </form>
    );
  }
}

LogIn.propTypes = {
  fetchNotes: React.PropTypes.func
};

export default LogIn;
