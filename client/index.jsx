import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';

import platoApp from './plato';

console.log('platoApp components: ', platoApp.components);

const loggerMiddleware = createLogger();


const store = createStore(
  platoApp.reduce.default,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const dispatcher = (action, value) => store.dispatch(action(value));

const PlatoComp = platoApp.components.default;


/* ------------------- START IT UP ---------------------------*/

const render = () => {
  ReactDOM.render(

    <PlatoComp
      dispatcher={dispatcher}
      {...store.getState()}
    />,
    document.getElementById('app')
  );
};

store.subscribe(render);
render();
/* ------------------- COMPONENTS ---------------------------*/

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { username: '' };
//   }
//   render() {
//     return (
//       <form
//         className="login"
//         onSubmit={(e) => {
//           e.preventDefault();
//           // Dispath this.state.username so that store is updated
//           store.dispatch(platoApp.actions.loginUser(this.state.username));
//           store.dispatch(platoApp.actions.fetchNotes(this.state.username));
//           this.setState({ username: '' });
//         }}
//       >
//         <h3>Login:</h3>
//         <input
//           type="text"
//           onChange={
//             e => this.setState({ username: e.target.value })
//           }
//         />
//         <input
//           type="submit"
//         />
//       </form>
//     );
//   }
// }

// const NoteItem = ({ note }) => (
//   <li>{note.title}</li>
// );
// NoteItem.propTypes = { note: React.PropTypes.object };

// const NotesList = ({ notes }) => (
//   <ul>
//     {notes.map(note =>
//       <NoteItem
//         key={note._id}
//         note={note}
//       />
//     )}
//   </ul>
// );
// NotesList.propTypes = { notes: React.PropTypes.array };

// const PlatoApp = (props) => {
//   const {
//     username,
//     savedNotes
//   } = props;
//   return (
//     <div>
//       <h1>This is Plato Note Taker!</h1>
//       <Login />
//       <h2>Your Notes:</h2>
//       <NotesList notes={savedNotes.notes} />
//     </div>
//   );
// };

