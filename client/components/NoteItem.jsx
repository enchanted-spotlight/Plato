import React from 'react';
import request from 'superagent';
const NoteItem = (props) => {
  console.log(props);
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
      <h3>{props.title}</h3>
      <button onClick={() => displayNote()}> DISPLAY NOTE </button>
      <button onClick={() => deleteNote()}> DELETE NOTE </button>
    </li>
  );
};

NoteItem.propTypes = {
  title: React.PropTypes.string,
};

export default NoteItem;
