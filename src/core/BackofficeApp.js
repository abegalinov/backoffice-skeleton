import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import loginReducer from './state/loginReducer';
import { loginRestore } from "./state/loginActions";
import SecuredApp from './components/SecuredApp';
import AppContext from './AppContext';

import ServiceRegistry from './services/ServicesRegistry';

export default class BackofficeApp {
  defaultTitle = 'Backoffice application';
  #reducers = { login: loginReducer };
  #resources = [];
  #pathTitlesName = {};
  #store;
  #serviceRegistry = new ServiceRegistry();

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
  mount(domElementId = 'root') {
    this.initStore();
    this.buildTitlesMap();    
    ReactDOM.render(
      <Provider store={this.#store}>
        <AppContext.Provider value={this}>
          <BrowserRouter>
            <SecuredApp />
          </BrowserRouter>
        </AppContext.Provider>
      </Provider>,
      document.getElementById(domElementId)
    );
  }
}
