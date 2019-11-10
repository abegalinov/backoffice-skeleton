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

import { loginProcess } from '../state/actions';
import  useStyles  from '../styles';

export function Login(props) {
  const classes = useStyles();

  if (props.loggedIn) {
    const { from } = props.location.state || { from: { pathname: '/' } }
    return <Redirect to={from} />
  }
  
  const usernameInput = React.createRef();
  const passwordInput = React.createRef();

  const submitForm = () => {
    props.loginProcess({ username: usernameInput.current.value, password: passwordInput.current.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {props.loading 
          ? <CircularProgress size={68} className={classes.loginProgress} /> 
          : <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
        }                 
        <form className={classes.form} noValidate>
          <TextField
            inputRef={usernameInput}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={props.error !== null}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            inputRef={passwordInput}
            variant="outlined"
            margin="normal"
            error={props.error !== null}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            onClick={submitForm}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default connect(
  state => ({
    loading: state.login.loading,
    error: state.login.error,
    loggedIn: state.login.loggedIn
  }), {
    loginProcess
  }
)(Login);
