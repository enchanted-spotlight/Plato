import * as actions from './actions';
import * as components from './components/index.jsx';
import * as constants from './constants';
import * as reduce from './reducer';

export default { actions, components, constants, reduce };

/* ----------- Folder Structure

http://jaysoo.ca/2016/02/28/organizing-redux-application/

plato/
  components/
  actions.js
  actionTypes.js
  constants.js
  index.js
  model.js
  reducer.js
index.js
rootReducer.js

-------------------------------*/
