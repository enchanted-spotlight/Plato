import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import request from 'superagent';

import * as a from './actions.js';
import App from './components/App.jsx';
import DashBoardContainer from './components/DashBoard.jsx';
import LandingPage from './components/LandingPage.jsx';
import reducers from './reducer.js';
import LogInContainer from './components/LogIn.jsx';
import SignUpContainer from './components/SignUp.jsx';
import socket from './socket.js';

// props defined in reducers.
const store = createStore(
  reducers,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(
    thunkMiddleware
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
          <Route
            path="dashboard"
            component={DashBoardContainer}
            onEnter={requireAuth}
          />
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
