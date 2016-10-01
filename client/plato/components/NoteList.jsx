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
<<<<<<< 7fed729b7eee2d6de65afb62495796d1bb180036:client/plato/components/NoteList.jsx
        <h2>Your Notes</h2>
        <ul>
          {this.state.note.map(element =>
            <NoteItem
              key={element._id}
              _id={element._id}
              title={element.title}
              text={element.text}
              username={this.state.username}
              loadNote={this.props.loadNote}
              fetchNotes={this.props.fetchNotes}
            />
          )}
        </ul>
=======
        <div>
          <ul>
            {this.state.note.map(element =>
              <NoteItem
                key={element._id}
                _id={element._id}
                title={element.title}
                text={element.text}
                username={this.state.username}
                loadNote={this.props.loadNote}
                fetchNotes={this.props.fetchNotes}
              />
            )}
          </ul>
        </div>
>>>>>>> (refactor) MVP materialize and CSS:client/components/NoteList.jsx
      </div>
    );
  }
}

NoteList.propTypes = {
  articles: React.PropTypes.arrayOf(React.PropTypes.object),
  loadNote: React.PropTypes.func,
  fetchNotes: React.PropTypes.func,
  username: React.PropTypes.string
};

export default NoteList;
