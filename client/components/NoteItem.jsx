import React from 'react';
import { Button } from 'react-materialize';

import * as a from './../actions.js';

const NoteItem = (props) => {
  const displayNote = () => {
    props.loadNote(props.text, props.title);
  };

  return (
    <li>
      <p>{props.title}</p>
      <Button
        onClick={() => displayNote()}
      > display </Button>
      <Button
        onClick={() => {
          this.props.store.dispatch(a.deleteNote(this.props.noteId));
          this.props.store.dispatch(a.fetchNotes(this.props.username));
        }}
        waves="light"
      > deleteNote </Button>
    </li>
  );
};

NoteItem.propTypes = {
  title: React.PropTypes.string
};

export default NoteItem;
