import React from 'react';
import NavBar from './NavBar.jsx';

// eslint-disable-next-line 
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
  children: React.PropTypes.object,
};

// <Navbar brand="Plato" right>
//   <NavItem Link to="/login">Login</NavItem>
//   <NavItem Link to="/signout">Signout</NavItem>
// </Navbar>
