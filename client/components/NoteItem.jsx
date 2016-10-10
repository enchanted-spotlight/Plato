import React from 'react';
import { Button } from 'react-materialize';
import { createEditorState } from 'medium-draft';
import { connect } from 'react-redux';

import * as a from './../actions.js';

const mapStateToProps = state => ({
  username: state.username
});
const mapDispatchToProps = dispatch => ({
  loadNote: (newEditorState, title) => {
    dispatch(a.onTextEditorChange(newEditorState));
    dispatch(a.onSessionTitleCreate(title));
  },
  deleteNote: (noteId, username) => (
    dispatch(a.deleteNote(noteId, username))
  )
});

const NoteItem = props => (
  <li>
    <p>{props.title}</p>
    <Button
      onClick={() => {
        const newEditorState = createEditorState(JSON.parse(props.text));
        props.loadNote(newEditorState, props.title);
      }}
    > display </Button>
    <Button
      onClick={() => {
        props.deleteNote(props.noteId, props.username);
      }}
      waves="light"
    > deleteNote </Button>
  </li>
);

NoteItem.propTypes = {
  title: React.PropTypes.string,
  deleteNote: React.PropTypes.func,
  username: React.PropTypes.string,
  noteId: React.PropTypes.string
};

const NoteItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteItem);


export default NoteItemContainer;
