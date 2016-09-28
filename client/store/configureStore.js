import { createStore } from 'redux';

import reducers from './../reducers/reducers.js';

store.dispatch({
  type: 'ADD_NOTE',
  note: 'This is a test note to update the store with!'
});
