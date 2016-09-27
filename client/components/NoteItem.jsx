import React from 'react';

const NoteItem = props => (
  <li>
    <h3>{props.title}</h3>
    <p>{props.text}</p>
  </li>
);

NoteItem.propTypes = {
  title: React.PropTypes.string,
  text: React.PropTypes.string
};

export default NoteItem;
