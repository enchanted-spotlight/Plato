import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
<<<<<<< cc0d132fb441723b689ce46b2e0f0cb8c2b6cd33
=======

>>>>>>> Implement redux refactor of login form

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

<<<<<<< cc0d132fb441723b689ce46b2e0f0cb8c2b6cd33
const render = () => {
  ReactDOM.render(
    <PlatoApp />,
=======

const dispatcher = (action, value) => store.dispatch(action(value));

const PlatoComp = platoApp.components.default;

const render = () => {
  ReactDOM.render(

    <PlatoComp
      dispatcher={dispatcher}
      {...store.getState()}
    />,
>>>>>>> Implement redux refactor of login form
    document.getElementById('app')
  );
};

store.subscribe(render);
render();
