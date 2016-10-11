import React from 'react';
import NavBar from './NavBar.jsx';


class App extends React.Component {
  render() {
    return (
      <div className="plato-app">
        <NavBar />
        {this.props.children}
      </div>
    );
  }

}

export default App;

App.propTypes = {
  children: React.PropTypes.Object,
};

// <Navbar brand="Plato" right>
//   <NavItem Link to="/login">Login</NavItem>
//   <NavItem Link to="/signout">Signout</NavItem>
// </Navbar>
