import React from 'react';
import { Button } from 'react-materialize';
import { createEditorState } from 'medium-draft';

import * as a from './../actions.js';

const NoteItem = props => (
  <li>
    <p>{props.title}</p>
    <Button
      onClick={() => {
        console.log('note item props: ', props);
        const newTextEditorState = createEditorState(JSON.parse(props.notesText));
        const newTranscriptEditorState = createEditorState(JSON.parse(props.transcriptText));
        props.store.dispatch(a.onSessionTitleCreate(props.title));
        props.store.dispatch(a.onTextEditorChange(newTextEditorState));
        props.store.dispatch(a.onSpeechEditorChange(newTranscriptEditorState));
        // need to change title of the note as well to match
      }}
    > display </Button>
    <Button
      onClick={() => {
        props.store.dispatch(a.deleteSession(props.noteId, props.username));
      }}
      waves="light"
    > deleteNote </Button>
  </li>
);

NoteItem.propTypes = {
  title: React.PropTypes.string,
  store: React.PropTypes.object,
  username: React.PropTypes.string,
  noteId: React.PropTypes.string
};

export default NoteItem;
