import React from 'react';
import request from 'superagent';

import NoteList from './NoteList.jsx';
import SearchBar from './SearchBar.jsx';
<<<<<<< c7419caab52c614b25d9a5507bc8ef3308dde971

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Jon',
      articles: []
    };
    const urlUser = `api/${this.state.user}`;
    request.get(urlUser, (err, res) => {
      this.setState({ articles: JSON.parse(res.text) });
    });
    this.statics = {
      handleTermChange: term => console.log('Search term: ', term)
    };
  }

  render() {
    return (
      <div>
        <h1>Howdy Dan!</h1>
        <SearchBar onTermChange={this.statics.handleTermChange} />
        <NoteList notes={this.state.articles} />
      </div>
    );
  }
}
=======


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [
        {
          id: 1,
          title: 'JavaScript Intro',
          text: 'JavaScript is super fun.'
        },
        {
          id: 2,
          title: 'JavaScript for Beginners',
          text: 'Functions on objects are methods.'
        },
        {
          id: 3,
          title: 'JavaScript Frameworks',
          text: 'Angular sure is nice, but this React stuff seems cool too.'
        },
      ]
    }
  }

  handleTermChange(term) {
    console.log('Search term: ' + term);
  }

  render() {
    return (
      <div>
        <h1>Howdy Dan!</h1>
        <SearchBar onTermChange={this.handleTermChange} />
        <NoteList notes={this.state.articles} />
      </div>
    );
  }
}

>>>>>>> Change browse componenet to NoteList and create NoteItem component

export default App;
