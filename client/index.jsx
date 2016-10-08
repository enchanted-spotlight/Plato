import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Row, Col, Navbar, NavItem } from 'react-materialize';
import io from 'socket.io-client';

import reducers from './reducer.js';
import ChatClientComponent from './components/ChatClient.jsx';

const socket = io();
socket.on('incoming slack message', (data) => {
  console.log('client side socket received data: ', data);
});
socket.on('slack message archive', (data) => {
  // console.log('message history received: ', data);
});

const loggerMiddleware = createLogger();

const store = createStore(
  reducers,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const App = () => (
  <Row>
    <Col s={2} className="base-col-height">
      <ChatClientComponent />
    </Col>
  </Row>
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

store.subscribe(render);
