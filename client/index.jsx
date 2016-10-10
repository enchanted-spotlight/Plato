import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Row, Col, Navbar, NavItem } from 'react-materialize';

import LogIn from './components/LogIn.jsx';
import NoteList from './components/NoteList.jsx';
import Session from './components/Session.jsx';
import SearchBar from './components/SearchBar.jsx';
import SpeechToTextEditor from './components/SpeechToTextEditor.jsx';
import MediumDraft from './components/MediumDraft.jsx';
import reducers from './reducer.js';

const loggerMiddleware = createLogger();

const store = createStore(
  reducers,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const dispatcher = (action, value) => store.dispatch(action(value));

const App = (props) => {
  const {
    // eslint-disable-next-line no-shadow
    store,
    username,
    savedNotes,
    textEditor,
    speechEditor,
    sessionTitle
  } = props;
  return (
    <div className="plato-app">
      <Navbar brand="Plato" right>
        <NavItem href="">Login</NavItem>
        <NavItem href="">Signout</NavItem>
      </Navbar>
      <LogIn
        dispatcher={dispatcher}
      />
      <SearchBar
        store={store}
        username={username}
      />
      <Row>
        <Col s={2} className="blue-grey lighten-3 base-col-height">
          <div className="blue-grey lighten-3 column-header-lists">
            <h3>All Notes</h3>
          </div>
          <NoteList
            store={store}
            username={username}
            notes={savedNotes.notes}
          />
        </Col>
        <Col s={10} className="session-container">
          <Session
            username={username}
            speechEditor={speechEditor}
            currentNote={textEditor}
            currentNoteTitle={sessionTitle}
            savedNotes={savedNotes}
            store={store}
          />
        </Col>
      </Row>
    </div>
  );
};

App.propTypes = {
  store: React.PropTypes.object,
  username: React.PropTypes.string,
  savedNotes: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Object)
  ]),
  textEditor: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Object)
  ]),
  speechEditor: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Object)
  ]),
  sessionTitle: React.PropTypes.string
};

const render = () => {
  ReactDOM.render(
    <App
      store={store}
      {...store.getState()}
    />,
    document.getElementById('app')
  );
};

App.propTypes = {
  store: React.PropTypes.Object,
  username: React.PropTypes.string,
  // password: React.PropTypes.string,
  savedNotes: React.PropTypes.Object,
  textEditor: React.PropTypes.Object,
  speechEditor: React.PropTypes.Object,
  sessionTitle: React.PropTypes.string
};

store.subscribe(render);
render();
/*
<Col s={2} className="grey lighten-2 base-col-height">
  <SpeechToTextEditor />
</Col>

<Col s={8} className="base-col-height">
  <MediumDraft
    store={store}
    username={username}
    currentNote={textEditor}
    currentNoteTitle={sessionTitle}
  />
</Col>
*/
