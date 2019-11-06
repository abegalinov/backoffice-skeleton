import { loadService, AUTH_SERVICE } from "../services/servicesContainer";

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_RESTORE = 'LOGIN_RESTORE';

export const LOCAL_STORAGE_LOGIN_KEY = 'loggedIn';

const authService = loadService(AUTH_SERVICE);

export const loginProcess = ({ username, password }) => {
  return dispatch => {
    dispatch(loginStarted());
    
    authService.login(username, password)
    .then(authData => {
        localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, JSON.stringify(authData));
        dispatch(loginSuccess(authData));
      }).catch(error => {
        console.log(error);
        dispatch(loginFailed());
      }
    );
  };
};

export const loginRestore = () => {
  return dispatch => {
    let storedLoggedIn = localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY);
    if (!storedLoggedIn) {
      return;
    }
    storedLoggedIn = JSON.parse(storedLoggedIn);
    if (storedLoggedIn.tokenValidUntil > Date.now()) {
      dispatch(loginSuccess(storedLoggedIn));
      return;
    }
    localStorage.removeItem(LOCAL_STORAGE_LOGIN_KEY);
  }
}

const loginStarted = () => ({
  type: LOGIN_STARTED
});

const loginSuccess = authData => ({
  type: LOGIN_SUCCESS,
  payload: {
    ...authData
  }
});

const loginFailed = () => ({
  type: LOGIN_FAILED
});
