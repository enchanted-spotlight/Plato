import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Row, Col, Navbar, NavItem } from 'react-materialize';
import { Router, Route, hashHistory } from 'react-router';

import request from 'superagent';


import App from './components/App.jsx';
import DashBoard from './components/DashBoard.jsx';
import LandingPage from './components/LandingPage.jsx';

import * as a from './actions.js';

import reducers from './reducer.js';
import ChatClientComponent from './components/ChatClient.jsx';
import LogInContainer from './components/LogIn.jsx';
import SearchBarContainer from './components/SearchBar.jsx';
import NoteListContainer from './components/NoteList.jsx';
// import MediumEditor from './components/MediumDraft.jsx';
// import SpeechToTextEditor from './components/SpeechToTextEditor.jsx';
import SessionContainer from './components/Session.jsx';
import SignUpContainer from './components/SignUp.jsx';
import Canvas from './components/Canvas.jsx';
import socket from './socket.js';

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

socket.on('incoming chat message', (data) => {
  store.dispatch(a.loadNewChatMessage(data));
});

socket.on('chat room archive', (data) => {
  store.dispatch(a.loadArchivedChatMessages(data));
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
          <Route path="dashboard" component={DashBoard} onEnter={requireAuth} />
          <Route path="login" component={LogInContainer} />
          <Route path="signup" component={SignUpContainer} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
};


store.subscribe(render);
render();
