import { combineReducers } from 'redux';

import * as t from './actionTypes';
import * as m from './model';

const username = (state = m.usernameInitialState, action) => {
  if (action.type === t.USER_LOGIN) {
    return action.username;
  }
  return state;
};

const savedNotes = (state = m.notesInitialState, action) => {
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
    return {
      ...m.notesInitialState,
      isFetching: true
    };
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

const textEditor = (state = m.textEditorInitialState, action) => {
  if (action.type === t.TEXT_EDITOR_CHANGE) {
    return {
      ...state,
      editorState: action.editorState
    };
  }
  return state;
};

const session = (state = m.currentSessionTitle, action) => {
  if (action.type === t.CREATE_SESSION_TITLE) {
    return {
      ...state,
      sessionTitle: action.sessionTitle
    };
  }
  return state;
};

export default combineReducers({
  username,
  savedNotes,
  textEditor
});