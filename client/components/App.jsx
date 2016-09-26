import React from 'react';

import NoteList from './NoteList.jsx';
import SearchBar from './SearchBar.jsx';

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
    };
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
