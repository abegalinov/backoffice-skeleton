import { AUTH_SERVICE, STORAGE_SERVICE } from "../services";
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_STARTED, LOGOUT } from "./loginActionTypes";
export const STORED_LOGIN_DATA_KEY = 'loggedIn'; // async actions that create and dispatch simple actions

export const loginProcess = ({
  username,
  password
}) => {
  return (dispatch, getState, serviceRegistry) => {
    dispatch(loginStarted());
    return serviceRegistry.getService(AUTH_SERVICE).login(username, password).then(authData => {
      serviceRegistry.getService(STORAGE_SERVICE).storeData(STORED_LOGIN_DATA_KEY, authData);
      dispatch(loginSuccess(authData));
    }).catch(error => {
      dispatch(loginFailed());
    });
  };
};
export const loginRestore = () => {
  return (dispatch, getState, serviceRegistry) => {
    const localStorageService = serviceRegistry.getService(STORAGE_SERVICE);
    const storedLoggedIn = localStorageService.getData(STORED_LOGIN_DATA_KEY);

    if (!storedLoggedIn) {
      return;
    }

    if (storedLoggedIn.tokenValidUntil > Date.now()) {
      dispatch(loginSuccess(storedLoggedIn));
      return;
    }

    localStorageService.removeData(STORED_LOGIN_DATA_KEY);
  };
};
export const logoutProcess = () => {
  return (dispatch, getState, serviceRegistry) => {
    dispatch(logout());
    serviceRegistry.getService(STORAGE_SERVICE).removeData(STORED_LOGIN_DATA_KEY);
  };
}; // simple actions that affect state

export const loginStarted = () => ({
  type: LOGIN_STARTED
});
export const loginSuccess = authData => ({
  type: LOGIN_SUCCESS,
  payload: { ...authData
  }
});
export const loginFailed = () => ({
  type: LOGIN_FAILED
});
export const logout = () => ({
  type: LOGOUT
});