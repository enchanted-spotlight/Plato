import React from 'react';
import { Button } from 'react-materialize';
import { createEditorState } from 'medium-draft';

import * as a from './../actions.js';

const NoteItem = props => (
  <li>
    <p>{props.title}</p>
    <Button
      onClick={() => {
        const newEditorState = createEditorState(JSON.parse(props.text));
        props.store.dispatch(a.onTextEditorChange(newEditorState));
      }}
    > display </Button>
    <Button
      onClick={() => {
        props.store.dispatch(a.deleteNote(props.noteId));
        props.store.dispatch(a.fetchNotes(props.username));
      }}
      waves="light"
    > deleteNote </Button>
  </li>
);

NoteItem.propTypes = {
  title: React.PropTypes.string,
  store: React.PropTypes.object,
  noteId: React.PropTypes.string,
  username: React.PropTypes.username
};

export default NoteItem;
