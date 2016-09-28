import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';

import platoApp from './plato';

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
