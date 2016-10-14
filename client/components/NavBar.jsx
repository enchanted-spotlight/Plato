import React from 'react';
import { browserHistory } from 'react-router';
import { Navbar, NavItem } from 'react-materialize';
import request from 'superagent';

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
const NavBar = () => (
  <nav>
    <div className="nav-wrapper">
      <a href="/" className="brand-logo center">P L A T O</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="/login">Login</a></li>
        <li><a onClick={() => logout()}>Logout</a></li>
      </ul>
    </div>
  </nav>
);
/* eslint-enable */

export default NavBar;
