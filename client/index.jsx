import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import io from 'socket.io-client';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import request from 'superagent';
import App from './components/App.jsx';
import LogInContainer from './components/LogIn.jsx';
import SignUpContainer from './components/SignUp.jsx';
import DashBoardContainer from './components/DashBoard.jsx';
import LandingPage from './components/LandingPage.jsx';

import * as a from './actions.js';

import reducers from './reducer.js';


const loggerMiddleware = createLogger();

// props defined in reducers.
const store = createStore(
  reducers,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const socket = io();
socket.on('incoming slack message', (data) => {
  // console.log('client side socket received single message: ', data);
  const parseData = JSON.parse(data);
  store.dispatch(a.loadNewChatMessage(parseData.messages));
});

socket.on('slack message archive', (data) => {
  // console.log('message history received: ', data);
  // Can we initiate reducer and stuff from outside redux component?
  // We want the on incoming event to call an action and start reducer chain
  // so components can rerender from socket event
  // do we need socket somewhere else?
  const parseData = JSON.parse(data);
  store.dispatch(a.loadArchivedChatMessages(parseData.messages.reverse()));
});

const requireAuth = (nextState, replace, callback) => {
  request
    .get('/api/auth/identify')
    .end((err, result) => {
      if (result.status === 401) {
        replace({
          pathname: '/login',
        });
        callback();
      } else {
        callback();
      }
    });
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} >
          <IndexRoute component={LandingPage} />
          <Route path="dashboard" component={DashBoardContainer} onEnter={requireAuth} />
          <Route path="login" component={LogInContainer} />
          <Route path="signup" component={SignUpContainer} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
};


store.subscribe(render);
