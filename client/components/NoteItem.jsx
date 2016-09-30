import React from 'react';

const NoteItem = (props) => {
  const displayNote = () => {
    console.log('Clicked! Trying to display saved note...');
    console.log(props.text, props.title);
    props.loadNote(props.text, props.title);
  };

  return (
    <li>
      <h3>{props.title}</h3>
      <button onClick={() => displayNote()}> DISPLAY NOTE </button>
    </li>
  );
};

NoteItem.propTypes = {
  title: React.PropTypes.string,
};

export default NoteItem;
