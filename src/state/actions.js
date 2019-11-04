import axios from 'axios';

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const loginProcess = ({ username, password }) => {
  return dispatch => {
    dispatch(loginStarted());

    axios
      .post(`http://localhost:8080/auth`, {
        username,
        password
      })
      .then(res => {
        dispatch(loginSuccess(res.data));
      })
      .catch(err => {
        dispatch(loginFailed());
      });
  };
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
