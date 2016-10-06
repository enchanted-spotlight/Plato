import React from 'react';

// import SearchBar from './SearchBar.jsx';
// Eventually use searchbar inside browse notes?
// Is styling better that way?
import NoteItem from './NoteItem.jsx';

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: props.articles || [],
      username: props.username
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      note: newProps.notes,
      username: newProps.username
    });
  }

  render() {
    return (
      <div className="notes-list">
        <ul>
          {this.state.note.map(element =>
            <NoteItem
              store={this.props.store}
              key={element._id}
              noteId={element._id}
              title={element.title}
              text={element.text}
              username={this.state.username}
              loadNote={this.props.loadNote}
            />
          )}
        </ul>
      </div>
    );
  }
}

NoteList.propTypes = {
  articles: React.PropTypes.arrayOf(React.PropTypes.object),
  loadNote: React.PropTypes.func,
  username: React.PropTypes.string,
  store: React.PropTypes.object
};

export default NoteList;
