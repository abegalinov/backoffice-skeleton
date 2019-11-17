import ServiceRegistry, { AUTH_SERVICE, LOCAL_STORAGE_SERVICE } from "../services/ServicesRegistry";
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_STARTED, LOGOUT } from "./loginActionTypes";

export const STORED_LOGIN_DATA_KEY = 'loggedIn';

const serviceRegistry = new ServiceRegistry();

export const loginProcess = ({ username, password }) => {

  const localStorageService = serviceRegistry.getService(LOCAL_STORAGE_SERVICE);
  const authService = serviceRegistry.getService(AUTH_SERVICE);

  return dispatch => {
    dispatch(loginStarted());
      authService.login(username, password).then(authData => {
        localStorageService.storeData(STORED_LOGIN_DATA_KEY, authData);
        dispatch(loginSuccess(authData));
      }).catch(error => {
        dispatch(loginFailed());
      }
    );
  };
};

export const loginRestore = () => {

  const localStorageService = serviceRegistry.getService(LOCAL_STORAGE_SERVICE);

  return dispatch => {
    let storedLoggedIn = localStorageService.getData(STORED_LOGIN_DATA_KEY);
    if (!storedLoggedIn) {
      return;
    }
    if (storedLoggedIn.tokenValidUntil > Date.now()) {
      dispatch(loginSuccess(storedLoggedIn));
      return;
    }
    localStorageService.removeData(STORED_LOGIN_DATA_KEY);
  }
};

export const logoutProcess = () => {

  const localStorageService = serviceRegistry.getService(LOCAL_STORAGE_SERVICE);

  return dispatch => {
    dispatch(logout());
    localStorageService.removeData(STORED_LOGIN_DATA_KEY);
  }
};

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

const logout = () => ({
  type: LOGOUT
});
