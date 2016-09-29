import React from 'react';
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
      articles: []
    };
    this.searchNotes = term => console.log('Search term: ', term);
    // this.loginHandler = e => {
    //   e.preventDefault();
    //   this.setState({ username: e.target.value });
    // };
  }

  fetchNotes(e) {
    e.preventDefault();
    const urlUser = `api/${e.target.username.value}`;
    return request('GET', urlUser)
      .then((res) => {
        console.log(JSON.parse(res.text), 'this is here');
        this.setState({ articles: JSON.parse(res.text) });
      }, (err) => {
        console.log('Error fetching user: ', err);
      });
  }

  loginHandler(e) {
    e.preventDefault();
    console.log(e.target.value, 'username');
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div className="plato-app">
        <LogIn fetchNotes={this.fetchNotes.bind(this)} loginHandler={this.loginHandler.bind(this)} />
        <h1>{this.state.username ?
          `Howdy ${this.state.username}!`
          : 'Howdy!'
          }
        </h1>
        <SearchBar onTermChange={this.searchNotes} />
        <h1>Your current Note:</h1>
        <MyEditor username={this.state.username} />
        <SpeechToTextEditor username={this.state.username} />
        <NoteList notes={this.state.articles} />
      </div>
    );
  }
}

export default App;
