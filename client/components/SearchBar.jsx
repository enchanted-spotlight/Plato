import React from 'react';

<<<<<<< 465f401d06181ec8bba8ccac77f71c40aaaf92ca
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onTermChange(term);
  }

  render() {
    return (
      <div className="search">
        <h3>Search:</h3>
        <input
          type="text"
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onTermChange: React.PropTypes.func
};
=======
const SearchBar = props => (
  <div className="search-bar">
    <input
      type="text"
      value={props.value}
      onChange={props.handleChange}
    />
  </div>
);
>>>>>>> Create SearchBar component and include it in BrowseNotes

export default SearchBar;
