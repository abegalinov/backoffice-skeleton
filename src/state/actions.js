import authService from "../services/authService";

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_RESTORE = 'LOGIN_RESTORE';

export const LOCAL_STORAGE_LOGIN_KEY = 'loggedIn';

export const loginProcess = ({ username, password }) => {
  return dispatch => {
    dispatch(loginStarted());
    
    authService.login(
      username, 
      password, 
      authData => {
        localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, JSON.stringify(authData));
        dispatch(loginSuccess(authData));
      },
      error => {
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
