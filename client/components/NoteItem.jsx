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
        // need to change title of the note as well to match
        props.store.dispatch(a.onSessionTitleCreate(props.title));
      }}
    > display </Button>
    <Button
      onClick={() => {
        props.store.dispatch(a.deleteNote(props.noteId, props.username));
      }}
      waves="light"
    > deleteNote </Button>
  </li>
);

NoteItem.propTypes = {
  title: React.PropTypes.string,
  store: React.PropTypes.func,
  username: React.PropTypes.string,
  noteId: React.PropTypes.string
};

export default NoteItem;
