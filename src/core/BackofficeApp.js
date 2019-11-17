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

export default class BackofficeApp {
  defaultTitle = 'Backoffice application';
  #reducers = { login: loginReducer };
  #resources = [];
  #pathTitlesName = {};
  #store;

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
    this.#resources.map( resource => {
      this.#pathTitlesName [resource.path] = resource.title;
    });
  }
  initStore() {
    const reducers = combineReducers(this.#reducers);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;    
    this.#store = process.env.NODE_ENV === 'development' 
      ? createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)))
      : createStore(reducers, applyMiddleware(thunk));    
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
