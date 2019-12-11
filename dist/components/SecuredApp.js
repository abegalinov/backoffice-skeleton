import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './Login';
import App from './App';
import LoginRequiredRoute from './LoginRequiredRoute';

const SecuredApp = () => React.createElement(Switch, null, React.createElement(Route, {
  path: "/login/",
  component: Login
}), React.createElement(LoginRequiredRoute, {
  component: App
}));

export default withRouter(SecuredApp);