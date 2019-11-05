import { combineReducers } from 'redux';
import { LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILED } from './actions';

const initialState = {loading: false, error: null, loggedIn: null};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STARTED: 
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS: 
      return {
        ...state,
        loading: false,
        error: null,
        loggedIn: [ action.payload ]
      };
    case LOGIN_FAILED: 
      return {
        ...state,
        loading: false,
        error: 'Login failed'
      };
    default: return state;
  };
};

const reducers = combineReducers({
  login: loginReducer,
});

export default reducers;
