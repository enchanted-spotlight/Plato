import React from 'react';
import request from 'superagent';

import LogIn from './LogIn.jsx';
import NoteList from './NoteList.jsx';
import SearchBar from './SearchBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      articles: []
    };
    this.searchNotes = term => console.log('Search term: ', term);
    this.fetchNotes = (username) => {
      const urlUser = `api/${username}`;
      return request('GET', urlUser)
        .then((res) => {
          this.setState({ articles: JSON.parse(res.text) })
        }, (err) => {
          console.log('Error fetching user notes: ', err);
        });
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
        <NoteList notes={this.state.articles} />
      </div>
    );
  }
}

export default App;
