import React from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import request from 'superagent';

import LogIn from './LogIn.jsx';
import NoteList from './NoteList.jsx';
import SearchBar from './SearchBar.jsx';
import SpeechToTextEditor from './SpeechToTextEditor.jsx';
import MyEditor from './MyEditor.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      // articles represents user's notes
      articles: [],
      // currentNote will represent the current "main" note,
      // we may want to change this later as we modularize things
      currentNote: EditorState.createEmpty(),
      currentNoteTitle: 'fake title'
    };
    // not functional yet
    this.searchNotes = term => console.log('Search term: ', term);

    // query DB, fetch all notes where username matches
    this.fetchNotes = (username) => {
      console.log('fetchNotes executed');
      this.setState({ username });
      const urlUser = `api/${username}`;
      request('GET', urlUser)
      // this is going to have to change, res.text is no longer just a string
        .then((res) => {
          this.setState({ articles: JSON.parse(res.text) });
        }, (err) => {
          console.log('Error fetching user notes: ', err);
        });
    };

    // change state of app so that it forces the myEditor component
    // to render with a note that we tell it to render
    this.loadNote = (note, title) => {
      const fromRaw = convertFromRaw(JSON.parse(note));
      this.setState({ currentNote: EditorState.createWithContent(fromRaw) });
      this.setState({ currentNoteTitle: title });
    };
  }

  render() {
    return (
      <div className="plato-app">
        <LogIn fetchNotes={this.fetchNotes} />
        <h1>{this.state.username ?
          `Howdy ${this.state.username}!`
          : 'Howdy!'
          }
        </h1>
        <SearchBar onTermChange={this.searchNotes} />
        <h1>Your current Note:</h1>
        <MyEditor
          username={this.state.username}
          currentNote={this.state.currentNote}
          currentNoteTitle={this.state.currentNoteTitle}
          fetchNotes={this.fetchNotes}
        />
        <SpeechToTextEditor username={this.state.username} />
        <NoteList
          username={this.state.username}
          notes={this.state.articles}
          loadNote={this.loadNote}
          fetchNotes={this.fetchNotes}
        />
      </div>
    );
  }
}

export default App;
