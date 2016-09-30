import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import connect from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const USER_LOGIN = 'USER_LOGIN';
const REQUEST_NOTES = 'REQUEST_NOTES';
const RECEIVE_NOTES = 'RECEIVE_NOTES';

const loggerMiddleware = createLogger();

/* ------------------- ACTIONS ---------------------------*/

const loginUser = username => ({
  type: USER_LOGIN,
  username
});

const requestNotes = username => ({
  type: REQUEST_NOTES,
  username
});

// Async requires three actions:
// 1. Inform reducers request initiated
// 2. Inform reducers request completed
// 3. Inform reducers taht request failed

// We will handle errors in the reducer by checking status passed
const receiveNotes = (username, results, status) => ({
  type: RECEIVE_NOTES,
  username,
  notes: results.map(child => child.data),
  status,
  recievedAt: Date.now()
});

/* ------------------- REDUCERS ---------------------------*/

const userLogin = (state = '', action) => {
  if (action.type === USER_LOGIN) {
    return action.username;
  }
  return state;
};

const platoApp = combineReducers({ userLogin });
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
    this.fetchNotes = (username) => {
      return (dispatch) => {
        dispatch(requestNotes(username));
        return fetch(`api/${username}`)
          .then(response => response.json())
          .then(json => dispatch(receiveNotes(username, json)));
      };
    };
  }
  render() {
    return (
      <form
        className="login"
        onSubmit={(e) => {
          e.preventDefault();
          // Dispath this.state.username so that store is updated
          store.dispatch(loginUser(this.state.username));
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
store.dispatch(fetchNotes('Jon')).then(() => console.log(store.getState()));
