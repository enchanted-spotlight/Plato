import React from 'react';
import request from 'superagent';
import { Button } from 'react-materialize';

const NoteItem = (props) => {
  const displayNote = () => {
    props.loadNote(props.text, props.title);
  };
  const deleteNote = () => {
    const urlId = `/api/delete-note/${props._id}`;
    request('DELETE', urlId)
      .end((err, res) => {
        if (err) {
          console.log('Error deleting the note');
        } else {
          props.fetchNotes(props.username);
        }
      });
  };

  return (
    <li>
      <p>{props.title}</p>
      <Button
        onClick={() => displayNote()}
      > display </Button>
      <Button
        onClick={() => deleteNote()}
        waves="light"
      > deleteNote </Button>
    </li>
  );
};

NoteItem.propTypes = {
  title: React.PropTypes.string
};

export default NoteItem;
