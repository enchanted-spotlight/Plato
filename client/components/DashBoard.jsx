import React from 'react';
import { Row, Col } from 'react-materialize';
import ChatClientComponent from './ChatClient.jsx';
import LogInContainer from './LogIn.jsx';
import SearchBarContainer from './SearchBar.jsx';
import NoteListContainer from './NoteList.jsx';
import MediumEditor from './MediumDraft.jsx';
import SpeechToTextEditor from './SpeechToTextEditor.jsx';
import SignUpContainer from './SignUp.jsx';

const DashBoard = () => (
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
      <ChatClientComponent />
    </Col>
  </Row>
);

export default DashBoard;
