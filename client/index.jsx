import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Row, Col, Navbar, NavItem } from 'react-materialize';
import io from 'socket.io-client';

import * as a from './actions.js';
import reducers from './reducer.js';
import ChatClientComponent from './components/ChatClient.jsx';
import LogInContainer from './components/LogIn.jsx';
import SearchBar from './components/SearchBar.jsx';

const loggerMiddleware = createLogger();

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

const App = () => (
  <div className="plato-app">

    <Navbar brand="Plato" right>
      <NavItem href="">Login</NavItem>
      <NavItem href="">Signout</NavItem>
    </Navbar>

    <SearchBar />

    <Row>
      <Col
        s={5}
        className="base-col-height"
      >
        <ChatClientComponent />
      </Col>
      <Col
        s={3}
        className="login"
      >
        <LogInContainer />
      </Col>
    </Row>

  </div>
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

store.subscribe(render);
