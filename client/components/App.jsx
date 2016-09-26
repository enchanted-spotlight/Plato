import React from 'react';
import request from 'superagent';

import NoteList from './NoteList.jsx';
import SearchBar from './SearchBar.jsx';

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

export default App;
