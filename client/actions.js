import request from 'superagent';

import * as t from './actionTypes';

export const setUsername = username => ({
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

/* ------------------ THUNK ACTION CREATORS -----------------*/
export const fetchNotes = username => (
  (dispatch) => {
    dispatch(requestNotes(username));
    return fetch(`/api/${username}`)
      .then(response => response.json())
      .then(json => dispatch(receiveNotes(username, json)));
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
          dispatch(setUsername(formData.username));
          dispatch(fetchNotes(formData.username));
        }
      });
  }
);

export const searchNotes = (username, term) => (
  (dispatch) => {
    const urlUser = `api/${username}`;
    dispatch(requestNotes(username));
    request
      .post(urlUser)
      .send({ searchInput: term })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('There is an error in SearchBar:', err);
        } else {
          dispatch(receiveNotes(username, res.body));
        }
      });
  }
);

export const deleteNote = (noteId, username) => (
  (dispatch) => {
    request('DELETE', `/api/delete-note/${noteId}`)
      .end((err, res) => {
        if (err) {
          console.log('Error deleting note');
        } else {
          dispatch(requestNotes(username));
          return fetch(`/api/${username}`)
            .then(response => response.json())
            .then(json => dispatch(receiveNotes(username, json)));
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
})

export const sendChatMessage = messageObj => (
  request
    .post('/api/chat')
    .set('Content-Type', 'application/json')
    .send({
      user: messageObj.user,
      message: messageObj.message
    })
    .end((err, res) => {
      if (err || !res.ok) {
        console.log('sendChatMessage error: ', err);
      } else {
        console.log('Success with sendChatMessage: ', res);
      }
    })
);
