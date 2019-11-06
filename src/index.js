import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './state/reducers';
import SecuredApp from './SecuredApp';
import { loginRestore } from "./state/actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers( 
  applyMiddleware(thunk)
));

store.dispatch(loginRestore());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SecuredApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
