import React from 'react';

const NoteItem = props => (
  <li key={props.key}>
    <h3>{props.title}</h3>
    <p>{props.text}</p>
  </li>
);

NoteItem.propTypes = {
  title: React.PropTypes.string,
  text: React.PropTypes.string,
  key: React.PropTypes.number
};

export default NoteItem;
