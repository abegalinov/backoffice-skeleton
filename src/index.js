import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'

import reducers from './state/reducers';
import ActuallyMainApp from './ActuallyMainApp';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ActuallyMainApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
