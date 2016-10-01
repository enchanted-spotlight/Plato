import React from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import request from 'superagent';

import LogIn from './LogIn.jsx';
import NoteList from './NoteList.jsx';
import SearchBar from './SearchBar.jsx';
import SpeechToTextEditor from './SpeechToTextEditor.jsx';
import MyEditor from './MyEditor.jsx';

const PlatoApp = (props) => {
  const {
    username,
    savedNotes
  } = props;
  return (
    <div>
      <h1>This is Plato Note Taker!</h1>
      <Login />
      <h2>Your Notes:</h2>
      <NotesList notes={savedNotes.notes} />
    </div>
  );
};

export default PlatoApp;
