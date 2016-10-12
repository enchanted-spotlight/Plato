import { combineReducers } from 'redux';

import * as t from './actionTypes';
import * as m from './model';

const username = (state = m.usernameInitialState, action) => {
  if (action.type === t.USER_LOGIN) {
    return action.username;
  }
  return state;
};

const signinStatus = (state = m.SignInInitialState, action) => {
  if (action.type === t.SIGNED_IN) {
    return action.payload;
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
    return action.editorState;
  }
  return state;
};

const speechEditor = (state = m.speechEditorInitialState, action) => {
  if (action.type === t.SPEECH_EDITOR_CHANGE) {
    return action.editorState;
  }
  return state;
};

const sessionTitle = (state = m.currentSessionTitle, action) => {
  if (action.type === t.CREATE_SESSION_TITLE) {
    return action.sessionTitle;
  }
  return state;
};

const chatMessages = (state = m.chatMessagesInitialState, action) => {
  if (action.type === t.LOAD_ARCHIVED_CHAT_MESSAGES) {
    return action.messages;
  }
  if (action.type === t.LOAD_NEW_CHAT_MESSAGE) {
    // console.log('loading new message!: ', action.message);
    const newState = [ ...state ];
    // console.log('newState value: ', newState);
    newState.push(action.message);
    return newState;
  }
  return state;
};

export default combineReducers({
  username,
  savedNotes,
  textEditor,
  speechEditor,
  sessionTitle,
  chatMessages,
  signinStatus
});
