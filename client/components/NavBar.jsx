import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, NavItem } from 'react-materialize';
import request from 'superagent';


const mapStateToProps = state => ({
  username: state.username
});

const mapDispatchToProps = dispatch => ({});

const logout = () => {
  request
    .get('/api/auth/logout')
    .end((err, res) => {
      if (err) {
        // do something on error
      } else {
        browserHistory.push('/');
      }
    });
};

/* eslint-disable */
const NavBar = (props) => (
  <nav className="light-blue darken-2">
    <div className="nav-wrapper">
      <a href="/" className="brand-logo center">P L A T O N O T E S</a>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li>{props.username}</li>
      </ul>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="/login">Login</a></li>
        <li><a onClick={() => logout()}>Logout</a></li>
      </ul>
    </div>
  </nav>
);
/* eslint-enable */

const NavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default NavBarContainer;
