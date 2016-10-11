import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import io from 'socket.io-client';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import LogInContainer from './components/LogIn.jsx';
import SignUpContainer from './components/SignUp.jsx';
import DashBoard from './components/DashBoard.jsx';
import LandingPage from './components/LandingPage.jsx';

import * as a from './actions.js';

import reducers from './reducer.js';
<<<<<<< b1498e6ce133d3fc22c0a78644727eb18d72bd80
import ChatClientComponent from './components/ChatClient.jsx';
import LogInContainer from './components/LogIn.jsx';
import SearchBarContainer from './components/SearchBar.jsx';
import NoteListContainer from './components/NoteList.jsx';
// import MediumEditor from './components/MediumDraft.jsx';
// import SpeechToTextEditor from './components/SpeechToTextEditor.jsx';
import SessionContainer from './components/Session.jsx';
import SignUpContainer from './components/SignUp.jsx';
import Canvas from './components/Canvas.jsx';
=======
>>>>>>> Begin to implement react-router

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

const App = () => (
  <div className="plato-app">
    <Navbar brand="Plato" right>
      <NavItem href="">Login</NavItem>
      <NavItem href="">Signout</NavItem>
    </Navbar>

    <Row>
      <Col s={2} className="blue-grey lighten-3 base-col-height">
        <SearchBarContainer />
        <div className="blue-grey lighten-3 column-header-lists">
          <h3>All Notes</h3>
        </div>
        <NoteListContainer />
      </Col>

      <Col s={5} className="base-col-height session-container">
        <SessionContainer />
      </Col>

      <Col s={3} className="login">
        <SignUpContainer />
        <LogInContainer />
        <ChatClientComponent />
      </Col>
    </Row>
    <Row>
      <Col s={12} className="base-col-height">
        <Canvas />
      </Col>
    </Row>
  </div>
);


const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} >
          <IndexRoute component={LandingPage} />
          <Route path="dashboard" component={DashBoard} />
          <Route path="login" component={LogInContainer} />
          <Route path="signup" component={SignUpContainer} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
};

App.propTypes = {
  store: React.PropTypes.object,
  username: React.PropTypes.string,
  // password: React.PropTypes.string,
  savedNotes: React.PropTypes.object,
  textEditor: React.PropTypes.object,
  speechEditor: React.PropTypes.object,
  sessionTitle: React.PropTypes.string
};

store.subscribe(render);

/*
      <Col
        s={5}
        className="base-col-height"
      >
        <MediumEditor />
      </Col>

      <Col s={2} className="grey lighten-2 base-col-height">
        <SpeechToTextEditor />
      </Col>
*/
