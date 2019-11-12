import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Login from './Login';
import App from './App';
import LoginRequiredRoute from './LoginRequiredRoute';

const SecuredApp = () => (
  <Switch>
    <Route path="/login/" component={Login} />
    <LoginRequiredRoute component={App} />
  </Switch>
);

export default withRouter(SecuredApp);
