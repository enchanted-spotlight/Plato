import request from 'superagent';

import * as t from './actionTypes';

export const loginUser = username => ({
  type: t.USER_LOGIN,
  username
});

// Async requires three actions:
// 1. Inform reducers request initiated
// 2. Inform reducers request completed
// 3. Inform reducers request failed

export const requestSessions = username => ({
  type: t.REQUEST_NOTES,
  username
});

// TODO: normalize notes into object instead of array
// (Improve access and let it be present in different scoped components.)
// https://github.com/paularmstrong/normalizr
export const receiveSessions = (username, notes, status) => ({
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
export const fetchSessions = username => (
  (dispatch) => {
    dispatch(requestSessions(username));
    return fetch(`/api/${username}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSessions(username, json)));
  }
);

export const deleteSession = (noteId, username) => (
  (dispatch) => {
    request('DELETE', `/api/delete-session/${noteId}`)
      .end((err, res) => {
        if (err) {
          console.log('Error deleting note');
        } else {
          dispatch(requestSessions(username));
          return fetch(`/api/${username}`)
            .then(response => response.json())
            .then(json => dispatch(receiveSessions(username, json)));
        }
      });
  }
);

export const searchNotes = (username, term) => (
  (dispatch) => {
    const urlUser = `api/${username}`;
    dispatch(requestSessions(username));
    request
      .post(urlUser)
      .send({ searchInput: term })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('There is an error in SearchBar:', err);
        } else {
          dispatch(receiveSessions(username, res.body));
        }
      });
  }
);
