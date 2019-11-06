import { loadService, AUTH_SERVICE, LOCAL_STORAGE_SERVICE } from "../services/servicesContainer";
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_STARTED } from "./actionTypes";

let authService = loadService(AUTH_SERVICE);
let localStorageService = loadService(LOCAL_STORAGE_SERVICE);

export const loginProcess = ({ username, password }) => {
  return dispatch => {
    dispatch(loginStarted());
    authService.login(username, password).then(authData => {
        localStorageService.storeLoginData(authData);
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
    let storedLoggedIn = localStorageService.getLoginData();
    if (!storedLoggedIn) {
      return;
    }
    if (storedLoggedIn.tokenValidUntil > Date.now()) {
      dispatch(loginSuccess(storedLoggedIn));
      return;
    }
    localStorageService.removeLoginData();
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
