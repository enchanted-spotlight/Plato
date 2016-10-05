import { combineReducers } from 'redux';

import * as t from './actionTypes';
import { notesInitialState, usernameInitialState } from './model';

const username = (state = usernameInitialState, action) => {
  if (action.type === t.USER_LOGIN) {
    return action.username;
  }
  return state;
};

const savedNotes = (state = notesInitialState, action) => {
  if (action.type === t.INVALIDATE_NOTES) {
    return {
      ...state,
      didInvalidate: true
    };
  }
  if (action.type === t.REQUEST_NOTES) {
    // For now we will wipe old notes out on new request
    // By setting object back to initial state
    // May want to refactor to have separate WIPE_NOTES action
    return notesInitialState;
  }
  if (action.type === t.RECEIVE_NOTES) {
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      notes: action.notes
    };
  }
  return state;
};

export default combineReducers({
  username,
  savedNotes
});
