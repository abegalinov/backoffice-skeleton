import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loginProcess } from '../state/loginActions';
import useStyles from './styles';
export function Login(props) {
  const classes = useStyles();

  if (props.loggedIn) {
    const {
      from
    } = props.location.state || {
      from: {
        pathname: '/'
      }
    };
    return React.createElement(Redirect, {
      to: from
    });
  }

  const usernameInput = React.createRef();
  const passwordInput = React.createRef();

  const submitForm = () => {
    props.loginProcess({
      username: usernameInput.current.value,
      password: passwordInput.current.value
    });
  };

  return React.createElement(Container, {
    component: "main",
    maxWidth: "xs"
  }, React.createElement(CssBaseline, null), React.createElement("div", {
    className: classes.paper
  }, props.loading ? React.createElement(CircularProgress, {
    size: 68,
    className: classes.loginProgress
  }) : React.createElement(Avatar, {
    className: classes.avatar
  }, React.createElement(LockOutlinedIcon, null)), React.createElement("form", {
    className: classes.form,
    noValidate: true
  }, React.createElement(TextField, {
    inputRef: usernameInput,
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    error: props.error !== null,
    id: "email",
    label: "Email Address",
    name: "email",
    autoComplete: "email",
    autoFocus: true
  }), React.createElement(TextField, {
    inputRef: passwordInput,
    variant: "outlined",
    margin: "normal",
    error: props.error !== null,
    required: true,
    fullWidth: true,
    name: "password",
    label: "Password",
    type: "password",
    id: "password",
    autoComplete: "current-password"
  }), React.createElement(Button, {
    onClick: submitForm,
    fullWidth: true,
    variant: "contained",
    color: "primary",
    className: classes.submit
  }, "Sign In"))));
}
export default connect(state => ({
  loading: state.login.loading,
  error: state.login.error,
  loggedIn: state.login.loggedIn
}), dispatch => ({
  loginProcess: loginInfo => dispatch(loginProcess(loginInfo))
}))(Login);