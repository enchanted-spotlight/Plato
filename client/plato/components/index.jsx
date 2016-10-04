import React from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import request from 'superagent';

import Login from './Login.jsx';
import NoteList from './NoteList.jsx';
import SearchBar from './SearchBar.jsx';
import SpeechToTextEditor from './SpeechToTextEditor.jsx';
import MyEditor from './MyEditor.jsx';

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
