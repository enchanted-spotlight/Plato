import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import connect from 'react-redux';

// import App from './components/App.jsx';
// import reducers from './reducers/reducers.js';


const counter = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT': {
    return state + 1;
  }
  case 'DECREMENT': {
    return state - 1;
  }
  default: {
    return state;
  }
  }
};

const store = createStore(counter);

console.log(store.getState());
store.dispatch({ type: 'INCREMENT' });
console.log(store.getState());

const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});

// const store = createStore(reducers);

// store.dispatch({
//   type: 'ADD_NOTE',
//   note: 'This is a test note to update the store with!'
// });

// const userReducer = (state = {}, action) => {
//   switch (action.type) {
//   case 'ADD_USER': {
//     const newState = state.concat([action.user]);
//     return newState;
//   }
//   default: {
//     return state;
//   }
//   }
// };

// const widgetReducer = (state = {}, action) => {
//   if (action.type === 'WIDGET_REL') {
//     const newState = 'cool stuff bro';
//     return newState;
//   }
//   return state;
// };

// const reducers = combineReducers({
//   userState: userReducer,
//   widgetState: widgetReducer
// });

// const store = createStore(reducers);

// store.dispatch({
//   type: 'ADD_USER',
//   user: { name: 'Dan' }
// });

// ReactDOM.render(<App />, document.getElementById('app'));
