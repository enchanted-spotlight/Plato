import React from 'react';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
    this.statics = {
      onInputChange: (e) => {
        this.setState({ username: e.target.value });
      },
      onFormSubmit: (e) => {
        e.preventDefault();
        this.props.fetchNotes(this.state.username);
      }
    };
  }

  render() {
    return (
      <form
        className="login"
        onSubmit={this.statics.onFormSubmit}
      >
        <h3>Login:</h3>
        <input
          type="text"
          onChange={this.statics.onInputChange}
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