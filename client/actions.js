import * as t from './actionTypes';

export const loginUser = username => ({
  type: t.USER_LOGIN,
  username
});

// Async requires three actions:
// 1. Inform reducers request initiated
// 2. Inform reducers request completed
// 3. Inform reducers request failed

export const requestNotes = username => ({
  type: t.REQUEST_NOTES,
  username
});

// TODO: normalize notes into object instead of array
// (Improve access and let it be present in different scoped components.)
// https://github.com/paularmstrong/normalizr
export const receiveNotes = (username, notes, status) => ({
  type: t.RECEIVE_NOTES,
  username,
  notes,
  status,
  recievedAt: Date.now()
});

export const onSessionTitleCreate = sessionTitle => ({
  type: t.CREATE_SESSION_TITLE,
  sessionTitle
});

export const onTextEditorChange = editorState => ({
  type: t.TEXT_EDITOR_CHANGE,
  editorState
});

export const onSpeechEditorChange = editorState => ({
  type: t.SPEECH_EDITOR_CHANGE,
  editorState
});

// Thunk action creator:
export const fetchNotes = username => (
  (dispatch) => {
    dispatch(requestNotes(username));
    return fetch(`api/${username}`)
      .then(response => response.json())
      .then(json => dispatch(receiveNotes(username, json)));
  }
);

