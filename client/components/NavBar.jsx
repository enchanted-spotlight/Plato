import React from 'react';
import { Link } from 'react-router';

const NavBar = () => (
  <div>
    <ul>
      <li><Link to="/login">login</Link></li>
      <li><Link to="/signout">signout</Link></li>
    </ul>
  </div>
);


export default NavBar;
