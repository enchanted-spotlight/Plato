import React from 'react';
import { convertFromRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';
import request from 'superagent';
import { Row, Col, Navbar, NavItem } from 'react-materialize';

import Login from './Login.jsx';
import NoteList from './NoteList.jsx';
import SearchBar from './SearchBar.jsx';
import SpeechToTextEditor from './SpeechToTextEditor.jsx';
import MediumEditor from './MediumDraft.jsx';
// <SearchBar onTermChange={this.searchNotes} />

const PlatoApp = (props) => {
  console.log(props);
  const {
    username,
    savedNotes
  } = props;
  return (
    <div>
      <h1>This is Plato Note Taker!</h1>
      <Login
        dispatcher={props.dispatcher}
      />
      <h2>Your Notes:</h2>
      <NoteList
        notes={savedNotes.notes}
      />
    </div>
  );
};


export default PlatoApp;

PlatoApp.propTypes= {
  dispatcher: React.PropTypes.func
};
