import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { changeLoggedIn } from './state/actions';
import Login from './Login';
import App from './App';
import LoginRequiredRoute from './LoginRequiredRoute';

class ActuallyMainApp extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login/" component={Login} />
        <LoginRequiredRoute component={App} />
      </Switch>
    )
  }
}

export default withRouter(connect(
  state => ({
    loggedIn: state.loggedIn,
  }), {
    changeLoggedIn,
  }
)(ActuallyMainApp))
