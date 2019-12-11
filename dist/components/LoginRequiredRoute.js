function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
export const LoginRequiredRoute = ({
  component: Component,
  ...rest
}) => React.createElement(Route, _extends({}, rest, {
  render: props => rest.loggedIn ? React.createElement(Component, props) : React.createElement(Redirect, {
    to: {
      pathname: '/login/',
      state: {
        from: props.location
      }
    }
  })
}));
export default connect(state => ({
  loggedIn: state.login.loggedIn
}))(LoginRequiredRoute);