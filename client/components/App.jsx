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
      // this parent state doesn't update from the child editor,
      // but we can use this state to force the editor to re-render
      // (eg, when we load a note)
      currentNote: EditorState.createEmpty(),
      currentNoteTitle: ''
    };
    // not functional yet
    this.searchNotes = term => console.log('Search term: ', term);

    // query DB, fetch all notes where username matches
    this.fetchNotes = (username) => {
      this.setState({ username });
      const urlUser = `api/${username}`;
      request('GET', urlUser)
      // this is going to have to change, res.text is no longer just a string
        .then((res) => {
          this.setState({ articles: JSON.parse(res.text) });
        }, (err) => {
          console.log('Error fetching user notes: ', err);
          // if we have a 404, that means that the user doesn't have any notes
          // in which case we dont need to display a note list
          // to display an empty note list, we set articles = []
          if (err.status === 404) {
            this.setState({ articles: [] });
          }
        });
    };

    // change state of app so that it forces the myEditor component
    // to render with a note that we tell it to render
    this.loadNote = (note, title) => {
      const fromRaw = convertFromRaw(JSON.parse(note));
      this.setState({ currentNote: EditorState.createWithContent(fromRaw) });
      this.setState({ currentNoteTitle: title });
    };

    // used by the login component to change the username state of the app
    this.setUsername = (username) => {
      this.setState({ username });
      this.fetchNotes(username);
    };
  }

  render() {
    return (
      <div className="plato-app">
        <LogIn fetchNotes={this.fetchNotes} setUsername={this.setUsername} />
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
        <SpeechToTextEditor
          username={this.state.username}
          fetchNotes={this.fetchNotes}
        />
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
