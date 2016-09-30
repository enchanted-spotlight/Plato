import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';

import platoApp from './plato';

const loggerMiddleware = createLogger();

const render = () => {
  ReactDOM.render(
    <PlatoApp />,
    document.getElementById('app')
  );
};

store.subscribe(render);
render();
