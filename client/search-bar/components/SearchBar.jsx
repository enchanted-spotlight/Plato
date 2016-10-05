import React from 'react';

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
      <div>
        <div className="search">
          <h3>Search:</h3>
          <input
            type="text"
            onChange={event => this.onInputChange(event.target.value)}
          />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onTermChange: React.PropTypes.func
};

export default SearchBar;
