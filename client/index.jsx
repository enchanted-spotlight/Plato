import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import connect from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

// Redux async docs:
// http://redux.js.org/docs/advanced/AsyncActions.html

const USER_LOGIN = 'USER_LOGIN';
const INVALIDATE_NOTES = 'INVALIDATE_NOTES';
const REQUEST_NOTES = 'REQUEST_NOTES';
const RECEIVE_NOTES = 'RECEIVE_NOTES';

const loggerMiddleware = createLogger();

/* ------------------- ACTION CREATORS ---------------------------*/

const loginUser = username => ({
  type: USER_LOGIN,
  username
});

// Async requires three actions:
// 1. Inform reducers request initiated
// 2. Inform reducers request completed
// 3. Inform reducers taht request failed

const requestNotes = username => ({
  type: REQUEST_NOTES,
  username
});

// We will handle errors in the reducer by checking status passed
// TODO: normalize notes into object instead of array
// (Improve access and let it be present in different scoped components.)
// https://github.com/paularmstrong/normalizr
const receiveNotes = (username, notes, status) => ({
  type: RECEIVE_NOTES,
  username,
  notes,
  status,
  recievedAt: Date.now()
});

// Thunk action creator:
const fetchNotes = username => (
  (dispatch) => {
    dispatch(requestNotes(username));
    return fetch(`api/${username}`)
      .then(response => response.json())
      .then(json => dispatch(receiveNotes(username, json)));
  }
);

/* ------------------- REDUCERS ---------------------------*/

const userLogin = (state = '', action) => {
  if (action.type === USER_LOGIN) {
    return action.username;
  }
  return state;
};

const notesInitialState = {
  isFetching: false,
  didInvalidate: false,
  notes: []
};
const notes = (state = notesInitialState, action) => {
  if (action.type === INVALIDATE_NOTES) {
    return {
      ...state,
      didInvalidate: true
    };
  }
  if (action.type === REQUEST_NOTES) {
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  }
  if (action.type === RECEIVE_NOTES) {
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      notes: action.notes
    };
  }
  return state;
};

const notesByUser = (state = {}, action) => {
  if (action.type === INVALIDATE_NOTES ||
      action.type === REQUEST_NOTES ||
      action.type === RECEIVE_NOTES) {
    return {
      ...state,
      notes: notes(state[notes], action)
    };
  }
  return state;
};

const platoApp = combineReducers({
  userLogin,
  notes,
  notesByUser
});
const store = createStore(
  platoApp,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

/* ------------------- COMPONENT ---------------------------*/

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  render() {
    return (
      <form
        className="login"
        onSubmit={(e) => {
          e.preventDefault();
          // Dispath this.state.username so that store is updated
          store.dispatch(loginUser(this.state.username));
          store.dispatch(fetchNotes(this.state.username));
          this.setState({ username: '' });
        }}
      >
        <h3>Login:</h3>
        <input
          type="text"
          value={this.state.username}
          onChange={
            e => this.setState({ username: e.target.value })
          }
        />
        <input
          type="submit"
        />
      </form>
    );
  }
}

const PlatoApp = () =>  (
  <div>
    <h1>This is Plato Note Taker!</h1>
    <Login />
    <h2>Your Notes:</h2>
    <ul>{}</ul>
  </div>
);

const render = () => {
  ReactDOM.render(
    <PlatoApp />,
    document.getElementById('app')
  );
};


store.subscribe(render);
render();

// TODO: dispatch fetchNotes on change of store's username value
// store.dispatch(fetchNotes('Jon')).then(() => console.log(store.getState()));
