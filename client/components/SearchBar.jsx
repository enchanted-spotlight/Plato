import React from 'react';

<<<<<<< ddb90b1a4add82f42d741a26bc78784ecaf7c305
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
