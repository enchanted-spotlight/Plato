import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Row, Col, Navbar, NavItem } from 'react-materialize';

import LogIn from './components/LogIn.jsx';
import NoteList from './components/NoteList.jsx';
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
      <SearchBar />
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

        <Col s={2} className="grey lighten-2 base-col-height">
          <SpeechToTextEditor />
        </Col>

        <Col s={8} className="base-col-height">
          <MediumDraft
            currentNote={textEditor}
            currentNoteTitle={sessionTitle}
          />
        </Col>
      </Row>
    </div>
  );
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


store.subscribe(render);
render();
