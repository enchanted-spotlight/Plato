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

const requestNotes = (username) => {
  return {
    type: REQUEST_NOTES,
    username
  };
};

// TODO: Add error handling to receiveNotes
const receiveNotes = (username, results) => {
  console.log('results given to receiveNotes: ', results);
  return {
    type: RECEIVE_NOTES,
    username,
    notes: results.map(child => child.data),
    recievedAt: Date.now()
  };
};

const fetchNotes = (username) => {
  return (dispatch) => {
    dispatch(requestNotes(username));
    return fetch(`api/${username}`)
      .then(response => response.json())
      .then(json => dispatch(receiveNotes(username, json)));
  };
};

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
          store.dispatch({
            type: USER_LOGIN,
            username: this.state.username
          });
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
store.dispatch(fetchNotes('Jon')).then(() => console.log(store.getState()));
