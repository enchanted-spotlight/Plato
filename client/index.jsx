import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Row, Col, Navbar, NavItem } from 'react-materialize';

import * as a from './actions.js';

import reducers from './reducer.js';
import ChatClientComponent from './components/ChatClient.jsx';
import LogInContainer from './components/LogIn.jsx';
import SearchBarContainer from './components/SearchBar.jsx';
import NoteListContainer from './components/NoteList.jsx';
// import MediumEditor from './components/MediumDraft.jsx';
// import SpeechToTextEditor from './components/SpeechToTextEditor.jsx';
import Session from './components/Session.jsx';
import SignUpContainer from './components/SignUp.jsx';
import Canvas from './components/Canvas.jsx';
import socket from './socket.js';

const loggerMiddleware = createLogger();

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

// =======
// const App = (props) => {
//   const {
//     // eslint-disable-next-line no-shadow
//     store,
//     username,
//     savedNotes,
//     textEditor,
//     speechEditor,
//     sessionTitle
//   } = props;
//   return (
//     <div className="plato-app">
//       <Navbar brand="Plato" right>
//         <NavItem href="">Login</NavItem>
//         <NavItem href="">Signout</NavItem>
//       </Navbar>
//       <LogIn
//         dispatcher={dispatcher}
//       />
//       <SearchBar
//         store={store}
//         username={username}
//       />
//       <Row>
//         <Col s={2} className="blue-grey lighten-3 base-col-height">
//           <div className="blue-grey lighten-3 column-header-lists">
//             <h3>All Notes</h3>
//           </div>
//           <NoteList
//             store={store}
//             username={username}
//             notes={savedNotes.notes}
//           />
//         </Col>
//         <Col s={10} className="session-container">
//           <Session
//             username={username}
//             transcript={speechEditor}
//             currentNote={textEditor}
//             currentNoteTitle={sessionTitle}
//             dispatcher={dispatcher}
//           />
//         </Col>
//       </Row>
//     </div>
//   );
// };
// >>>>>>> Fix transcript state and tests


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
        <Session />
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
      <App />
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
render();

