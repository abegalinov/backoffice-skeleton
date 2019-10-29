export const CHANGE_LOGGED_IN = 'CHANGE_LOGGED_IN';


export const changeLoggedIn = (newValue) => ({
  type: CHANGE_LOGGED_IN,
  newValue: newValue,
});
