import React from 'react';

const SearchBar = props => (
  <div className="search-bar">
    <input
      type="text"
      value={props.value}
      onChange={props.handleChange}
    />
  </div>
);

export default SearchBar;
