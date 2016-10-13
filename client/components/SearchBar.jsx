import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'throttle-debounce';

import * as a from './../actions.js';

const mapStateToProps = state => ({
  username: state.username
});

const mapDispatchToProps = dispatch => ({
  searchBounce: (user, value) => {
    if (value === '') {
      dispatch(a.fetchSessions(user));
    } else {
      dispatch(a.searchNotes(user, value));
    }
  }
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      searchBounce: debounce(750, props.searchBounce)
    };
    this.onInputChange = (e) => {
      console.log(this.props.username);
      this.state.searchBounce(this.props.username, e.target.value);
    };
  }

  render() {
    return (
      <div>
        <div className="search">
          <h3>Search:</h3>
          <input
            type="text"
            onChange={this.onInputChange}
          />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  username: React.PropTypes.string,
  searchBounce: React.PropTypes.Func
};

const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default SearchBarContainer;
