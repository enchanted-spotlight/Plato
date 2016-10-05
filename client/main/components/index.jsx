import React from 'react';
import { convertFromRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';
import request from 'superagent';
import { Row, Col, Navbar, NavItem } from 'react-materialize';

import Login from './Login.jsx';
import NoteList from './NoteList.jsx';
import SearchBar from './../../search-bar/components/SearchBar.jsx';
import SpeechToTextEditor from './SpeechToTextEditor.jsx';
import MediumEditor from './../../medium-draft/components/MediumDraft.jsx';
// <SearchBar onTermChange={this.searchNotes} />

const PlatoApp = (props) => {
  console.log(props);
  const {
    username,
    savedNotes
  } = props;
  return (
    <div className="plato-app">
      <Navbar brand="Plato" right>
        <NavItem href="">Login</NavItem>
        <NavItem href="">Signout</NavItem>
      </Navbar>
      <SearchBar />
      <Login
        dispatcher={props.dispatcher}
      />
      <NoteList
        notes={savedNotes.notes}
      />
      <Col s={8} className="base-col-height">
        <MediumEditor
          username={this.state.username}
          fetchNotes={this.fetchNotes}
          currentNote={this.state.currentNote}
          currentNoteTitle={this.state.currentNoteTitle}
        />
      </Col>
    </div>
  );
};

export default PlatoApp;

PlatoApp.propTypes= {
  dispatcher: React.PropTypes.func
};
