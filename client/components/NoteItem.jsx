import React from 'react';

const NoteItem = props => {
  return (
    <li>
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </li>
  )
}

export default NoteItem;
