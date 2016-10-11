import request from 'superagent';
import { browserHistory } from 'react-router';

import * as t from './actionTypes';

export const setUsername = username => ({
  type: t.USER_LOGIN,
  username
});

export const setSignIn = () => ({
  type: t.SIGNED_IN,
  payload: true
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

export const saveSession = sessionPkg => (
  (dispatch) => {
    request
      .post('/api/save-session') // 'api/save-session' ?
      .send(sessionPkg)
      .set('Accept', 'application/json')
      .end((err, data) => {
        if (err) {
          console.log('Error in saving session: ', err);
        } else {
          console.log('This should be saved: ', sessionPkg);
          console.log('data from submission: ', data);
          dispatch(fetchSessions(sessionPkg.user_id));
        }
      });
  }
);

export const loginUser = formData => (
  (dispatch) => {
    request
      .post('/api/auth/login/local')
      .send({
        username: formData.username,
        password: formData.password
      })
      .end((err, res) => {
        if (err) {
          // do something on error
          console.log('error logging in!');
        } else {
          // successful login
          console.log('It successfully logged in the user');
          dispatch(setUsername(formData.username));

          browserHistory.push('/dashboard');
          dispatch(fetchNotes(formData.username));
        }
      });
  }
);

// this will get the user's identity from their session
// if the session exists
export const getIdentity = () => (
  (dispatch) => {
    request
      .get('api/auth/identify')
      .end((err, res) => {
        if (err) {
          console.log('Error in getIdentity!');
        } else {
          const response = JSON.parse(res.text);
          dispatch(setUsername(response.email));
          dispatch(fetchSessions(response.email));
          dispatch(setSignIn());
        }
      });
  }
);

export const deleteSession = (noteId, username) => (
  (dispatch) => {
    request('DELETE', `/api/delete-session/${noteId}`)
      .end((err, res) => {
        if (err) {
          // do something on error
          console.log('error deleting note!');
        } else {
          dispatch(requestSessions(username));
          return fetch(`/api/${username}`)
            .then(response => response.json())
            .then(json => dispatch(receiveSessions(username, json)));
        }
      });
  }
);

export const submitSignUp = formData => (
  (dispatch) => {
    if (formData.password === formData.verifyPassword) {
      request
        .post('/api/auth/signup')
        .send({
          username: formData.username,
          password: formData.password
        })
        .end((err, res) => {
          if (err) {
            // error handling
          }
          request
            .post('/api/auth/login/local')
              .send({
                username: formData.username,
                password: formData.password
              })
              .end((err2, data) => {
                if (err2) {
                  console.log(err2);
                } else {
                  browserHistory.push('/dashboard');
                  dispatch(setUsername(formData.username));
                  dispatch(fetchNotes(formData.username));
                }
              });
        });
    } else {

      // passwords don't match, throw error here
    }
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

export const loadArchivedChatMessages = messages => ({
  type: t.LOAD_ARCHIVED_CHAT_MESSAGES,
  messages
});

export const loadNewChatMessage = message => ({
  type: t.LOAD_NEW_CHAT_MESSAGE,
  message
});

