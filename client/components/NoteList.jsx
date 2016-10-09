import React from 'react';
import { connect } from 'react-redux';

// import SearchBar from './SearchBar.jsx';
// Eventually use searchbar inside browse notes?
// Is styling better that way?
import NoteItem from './NoteItem.jsx';

const mapStateToProps = state => ({
  username: state.username,
  notes: state.savedNotes.notes
});
const mapDispatchToProps = dispatch => ({});

const NoteList = props => (
  <div className="notes-list">
    <ul>
      {props.notes.map(element =>
        <NoteItem
          store={props.store}
          key={element._id}
          noteId={element._id}
          title={element.title}
          text={element.text}
          username={props.username}
        />
      )}
    </ul>
  </div>
);

NoteList.propTypes = {
  username: React.PropTypes.string,
  notes: React.PropTypes.arrayOf(React.PropTypes.object),
};

const NoteListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList);


export default NoteListContainer;
