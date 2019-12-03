import { LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './loginActionTypes';

export const loginReducerInitialState = {loading: false, error: null, loggedIn: null};

const loginReducer = (state = loginReducerInitialState, action) => {
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
        loggedIn: { ...action.payload } 
      };
    case LOGIN_FAILED: 
      return {
        ...state,
        loading: false,
        error: 'Login failed'
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: null,
        loading: false,
        error: null
      };
    default: return state;
  };
};

export default loginReducer;
