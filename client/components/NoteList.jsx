import React from 'react';

// import SearchBar from './SearchBar.jsx';
// Eventually use searchbar inside browse notes?
// Is styling better that way?
import NoteItem from './NoteItem.jsx';

const NoteList = (props) => {
  // Map over array and create componenets for each item
  const noteItems = props.notes.map(note =>
    <NoteItem
      key={note.id}
      title={note.title}
      text={note.text}
    />
  );

  // Return built up notes component
  return (
    <div className="notes-list">
      <h2>Your Notes</h2>
      <ul>{noteItems}</ul>
    </div>
  );
};

// Validate expected property types
NoteList.propTypes = {
  notes: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default NoteList;
