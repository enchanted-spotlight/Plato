import React from 'react';

// import SearchBar from './SearchBar.jsx';
// Eventually use searchbar inside browse notes?
// Is styling better that way?
import NoteItem from './NoteItem.jsx';

const NoteList = props => (
  <div className="notes-list">
    <ul>
      {
      // console.log('notelist props: ', props)
      props.notes.map(element =>
        <NoteItem
          store={props.store}
          key={element._id}
          noteId={element._id}
          title={element.title}
          notesText={element.notesText}
          transcriptText={element.transcriptText}
          username={props.username}
        />
      )
    }
    </ul>
  </div>
);


NoteList.propTypes = {
  notes: React.PropTypes.arrayOf(React.PropTypes.object),
  username: React.PropTypes.string
};

export default NoteList;
