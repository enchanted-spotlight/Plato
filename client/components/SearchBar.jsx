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

  // onInputChange2(term) {
  //   const urlUser = `api/${this.state.username}`;
  //   console.log('This is firing');
  //   request('POST', urlUser)
  //   // this is going to have to change, res.text is no longer just a string
  //     .then((res) => {
  //       this.setState({ articles: JSON.parse(res.text) });
  //     }, (err) => {
  //       console.log('Error fetching user notes: ', err);
  //       // if we have a 404, that means that the user doesn't have any notes
  //       // in which case we dont need to display a note list
  //       // to display an empty note list, we set articles = []
  //       if (err.status === 404) {
  //         this.setState({ articles: [] });
  //       }
  //     });
  // }

  onInputChange(e) {
    this.callAjax(e.target.value);
  }

  callAjax(value) {
    console.log('This is after the debounce BS: ', value);
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
  userName: React.PropTypes.string
};

export default SearchBar;
