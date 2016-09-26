import React from 'react';

import SearchBar from './SearchBar.jsx';

const BrowseNotes = props => (
  <div className="notes-list">
    <h2>Your Notes</h2>
    <SearchBar />
  </div>
);

export default BrowseNotes;
