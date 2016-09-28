import { combineReducers } from 'redux';

const initialState = {
  username: '',
  notes: []
};

const userReducer = (state = initialState, action) => {
  if (action.type === 'SIGNIN_USER') {
    console.log('userReducer called with user: ', action.user);
  }
  return state;
};

const noteReducer = (state = initialState, action) => {
  let newState;
  if (action.type === 'ADD_NOTE') {
    return Object.assign({}, state, {
      notes: [
        ...state.notes,
        action.note
      ]
    });
  }
  return state;
};

const reducers = combineReducers({
  userState: userReducer,
  noteState: noteReducer
});

export default reducers;
