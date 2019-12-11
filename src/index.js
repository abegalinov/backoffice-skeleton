import React from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppContext from './AppContext';
import loginReducer from './state/loginReducer';
import { loginRestore } from "./state/loginActions";
import ServiceRegistry from './ServicesRegistry';
import MockAuthService from './services/MockAuthService';
import StorageService from './services/StorageService';

import SecuredApp from './components/SecuredApp';

export const AUTH_SERVICE = 'authService';
export const STORAGE_SERVICE = 'localStorageService';

export default class BackofficeSkeleton {
  defaultTitle = 'Backoffice application';
  #reducers = { login: loginReducer };
  #resources = [];
  #pathTitlesName = {};
  #store;
  #serviceRegistry;

  constructor() {
    this.initServices();
  }

  injectReducers(reducers) {
    this.#reducers = { ...this.#reducers, ...reducers };
  }

  addResource(resource) {
    this.#resources.push(resource);
  }

  getResources() {
    return this.#resources;
  }

  getTitleForPath(path) {
    return this.#pathTitlesName[path] || this.defaultTitle;
  }

  buildTitlesMap() {
    this.#resources.forEach(resource => {
      this.#pathTitlesName[resource.path] = resource.title;
    });
  }

  getServiceRegistry() {
    return this.#serviceRegistry;
  }

  initStore() {
    const reducers = combineReducers(this.#reducers);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;    
    const middleware = applyMiddleware(thunk.withExtraArgument(this.getServiceRegistry()));
    this.#store = process.env.NODE_ENV === 'development' 
      ? createStore(reducers, /* preloadedState, */ composeEnhancers(middleware))
      : createStore(reducers, middleware);    
    this.#store.dispatch(loginRestore());
  }
  
  initServices() {
    this.#serviceRegistry = new ServiceRegistry();
    this.getServiceRegistry().registerService(AUTH_SERVICE, new MockAuthService());
    this.getServiceRegistry().registerService(STORAGE_SERVICE, new StorageService());
  }

  createComponent() {
    this.initStore();
    this.buildTitlesMap();    
    return () => {
      return (
        <Provider store={this.#store}>
          <AppContext.Provider value={this}>
            <BrowserRouter>
              <SecuredApp />
            </BrowserRouter>
          </AppContext.Provider>
        </Provider>
      );
    }
  }
}
