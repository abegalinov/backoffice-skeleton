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
  constructor() {
    this.reducers = { login: loginReducer };
    this.resources = [];
  }
  injectReducers(reducers) {
    this.reducers = { ...this.reducers, ...reducers };
  }
  addResource(resource) {
    this.resources.push(resource);
  }
  getResources() {
    return this.resources;
  }
  initStore() {
    const reducers = combineReducers(this.reducers);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;    
    this.store = process.env.NODE_ENV === 'development' 
      ? createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)))
      : createStore(reducers, applyMiddleware(thunk));    
  }

  mount(domElementId = 'root') {
    this.initStore();
    this.store.dispatch(loginRestore());
    
    ReactDOM.render(
      <Provider store={this.store}>
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
