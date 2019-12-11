import loginReducer, { loginReducerInitialState } from '../../state/loginReducer';
import { loginStarted, loginSuccess, loginFailed, logout } from '../../state/loginActions';
describe('loginReducer', () => {
  it('initial state', () => {
    const newState = loginReducer(undefined, {});
    expect(newState).toEqual(loginReducerInitialState);
  });
  it('login started', () => {
    const newState = loginReducer(undefined, loginStarted());
    expect(newState.loading).toBe(true);
  });
  it('login success', () => {
    const newState = loginReducer(undefined, loginSuccess({
      username: 'test123'
    }));
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.loggedIn).toBeDefined();
    expect(newState.loggedIn.username).toBe('test123');
  });
  it('login failed', () => {
    const newState = loginReducer(undefined, loginFailed());
    expect(newState.loading).toBe(false);
    expect(newState.error).toBeDefined();
  });
  it('logout', () => {
    const newState = loginReducer(undefined, logout());
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.loggedIn).toBe(null);
  });
});