import React from 'react';
import request from 'superagent';
import { Button } from 'react-materialize';
import { debounce } from 'throttle-debounce';

import * as a from './../actions.js';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.callAjax = debounce(750, this.callAjax);
  }

  onInputChange(e) {
    this.callAjax(e.target.value);
  }

  callAjax(value) {
    this.props.store.dispatch(a.searchNotes(this.props.username, value));

    // const urlUser = `api/${this.props.username}`;
    // const querySearch = { searchInput: value };
    // request
    //   .post(urlUser)
    //   .send(querySearch)
    //   .set('Accept', 'application/json')
    //   .end((err, res) => {
    //     if (err) {
    //       console.log('There is an error in SearchBar:', err);
    //     } else {
    //       this.props.store.dispatch(a.searchNotes());
    //     }
    //   });
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
  store: React.PropTypes.Object
};

export default SearchBar;
