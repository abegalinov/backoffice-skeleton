import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';
import App from './App';
import LoginRequiredRoute from './LoginRequiredRoute';
import { changeLoggedIn } from './actions';

class ActuallyMainApp extends Component {
  componentDidMount() {
  }

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
