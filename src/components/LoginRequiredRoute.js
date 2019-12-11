import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export const LoginRequiredRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    rest.loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login/',
        state: { from: props.location }
      }} />
    )
  )} />
)

export default connect(
  state => ({
    loggedIn: state.login.loggedIn,
  })
)(LoginRequiredRoute);
