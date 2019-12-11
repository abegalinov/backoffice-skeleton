import sinon from 'sinon';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../../state/loginActionTypes';
import { loginProcess, loginRestore, logoutProcess, STORED_LOGIN_DATA_KEY } from '../../state/loginActions';

import ServiceRegistry from '../../ServicesRegistry';
import MockAuthService from '../../services/MockAuthService';

import { AUTH_SERVICE, LOCAL_STORAGE_SERVICE } from '../../index';

const mockAuthService = new MockAuthService();
const mockStorageService = { storeData: sinon.spy() };

const servicesRegistry = new ServiceRegistry();
servicesRegistry.registerService(AUTH_SERVICE, mockAuthService);
servicesRegistry.registerService(LOCAL_STORAGE_SERVICE, mockStorageService);

const middleware = [thunk.withExtraArgument(servicesRegistry)];
const mockStore = configureMockStore(middleware);

describe('loginActions', () => {

 it('login success', () => {
    const expectedActions = [
      { type: LOGIN_STARTED },
      { type: LOGIN_SUCCESS, payload: mockAuthService.authData }
    ];
    const store = mockStore({});

    return store.dispatch(loginProcess({ username: 'test', password: 'tester' }))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(mockStorageService.storeData.calledOnce).toBe(true);
            expect(mockStorageService.storeData.getCall(0).args[0]).toBe(STORED_LOGIN_DATA_KEY);
            expect(mockStorageService.storeData.getCall(0).args[1]).toBe(mockAuthService.authData);
        })
  });

  it('login failed', () => {
    const mockedAuthServiceThatFails = { 
        login: (username, password) => new Promise((resolve, reject) => {
            reject();
        })
    };
    servicesRegistry.registerService(AUTH_SERVICE, mockedAuthServiceThatFails);

    const expectedActions = [
      { type: LOGIN_STARTED },
      { type: LOGIN_FAILED }
    ];
    const store = mockStore({});

    return store.dispatch(loginProcess({ username: 'test', password: 'tester' }))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
  });

  it('login restore success', () => {
    mockStorageService.getData = sinon.fake.returns(mockAuthService.authData);
    const expectedActions = [
        { type: LOGIN_SUCCESS, payload: mockAuthService.authData }
    ];

    const store = mockStore({});
    store.dispatch(loginRestore());

    expect(store.getActions()).toEqual(expectedActions);
    expect(mockStorageService.getData.calledOnce).toBe(true);
    expect(mockStorageService.getData.getCall(0).args[0]).toBe(STORED_LOGIN_DATA_KEY);
  });

  it('login restore failed', () => {
    mockStorageService.getData = sinon.fake.returns(null);
    const expectedActions = [];

    const store = mockStore({});
    store.dispatch(loginRestore());

    expect(store.getActions()).toEqual(expectedActions);
    expect(mockStorageService.getData.calledOnce).toBe(true);
    expect(mockStorageService.getData.getCall(0).args[0]).toBe(STORED_LOGIN_DATA_KEY);
  });

  it('login restore expired', () => {
    mockAuthService.authData.tokenValidUntil = 1;
    mockStorageService.getData = sinon.fake.returns(mockAuthService);
    mockStorageService.removeData = sinon.spy();

    const expectedActions = [];
    const store = mockStore({});
    store.dispatch(loginRestore());

    expect(store.getActions()).toEqual(expectedActions);
    expect(mockStorageService.getData.calledOnce).toBe(true);
    expect(mockStorageService.getData.getCall(0).args[0]).toBe(STORED_LOGIN_DATA_KEY);
    expect(mockStorageService.removeData.calledOnce).toBe(true);
    expect(mockStorageService.removeData.getCall(0).args[0]).toBe(STORED_LOGIN_DATA_KEY);
  });

  it('logout', () => {
    mockStorageService.removeData = sinon.spy();

    const expectedActions = [
        { type: LOGOUT }
    ];
    const store = mockStore({});
    store.dispatch(logoutProcess());

    expect(store.getActions()).toEqual(expectedActions);
    expect(mockStorageService.removeData.calledOnce).toBe(true);
    expect(mockStorageService.removeData.getCall(0).args[0]).toBe(STORED_LOGIN_DATA_KEY);
  });
});
