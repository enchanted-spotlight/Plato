import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< cd44f6c8950214440c103a69513dd189bbdc8b4c
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';

import platoApp from './plato';

const loggerMiddleware = createLogger();


const store = createStore(
  platoApp.reduce.default,

const dispatcher = (action, value) => store.dispatch(action(value));

const PlatoComp = platoApp.components.default;

const render = () => {
  ReactDOM.render(
    <PlatoApp />,
    document.getElementById('app')
  );
};


store.subscribe(render);
render();
store.dispatch(fetchNotes('Jon')).then(() => console.log(store.getState()));
