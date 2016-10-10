import React from 'react';
import { Row, Col, Navbar, NavItem } from 'react-materialize';
import { Link } from 'react-router';
import ChatClientComponent from './ChatClient.jsx';
import LogInContainer from './LogIn.jsx';
import SearchBarContainer from './SearchBar.jsx';
import NoteListContainer from './NoteList.jsx';
import MediumEditor from './MediumDraft.jsx';
import SpeechToTextEditor from './SpeechToTextEditor.jsx';
import SignUpContainer from './SignUp.jsx';
import NavBar from './NavBar.jsx';

const App = () => (
  <div className="plato-app">


    <NavBar />

    <Row>
      <Col s={2} className="blue-grey lighten-3 base-col-height">
        <SearchBarContainer />
        <div className="blue-grey lighten-3 column-header-lists">
          <h3>All Notes</h3>
        </div>
        <NoteListContainer />
      </Col>
      <Col
        s={5}
        className="base-col-height"
      >
        <MediumEditor />
      </Col>
      <Col s={2} className="grey lighten-2 base-col-height">
        <SpeechToTextEditor />
      </Col>
      <Col
        s={3}
        className="login"
      >
        <SignUpContainer />
        <LogInContainer />
        <ChatClientComponent />
      </Col>
    </Row>

  </div>
);

export default App;

// <Navbar brand="Plato" right>
//   <NavItem Link to="/login">Login</NavItem>
//   <NavItem Link to="/signout">Signout</NavItem>
// </Navbar>
