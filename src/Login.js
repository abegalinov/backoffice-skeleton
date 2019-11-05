import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { loginProcess } from './state/actions';
import  useStyles  from './styles';

export function SignIn(props) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {props.props.loading 
          ? <CircularProgress size={68} className={classes.loginProgress} /> 
          : <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
        }                 
        <form className={classes.form} noValidate>
          <TextField
            onChange={props.setEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={props.isError()}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={props.setPassword}
            variant="outlined"
            margin="normal"
            error={props.isError()}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            onClick={props.submitForm}
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
  }
  isError = () => {
    return this.props.error !== null;
  }
  submitForm = () => {
    this.props.loginProcess({ username: this.state.email, password: this.state.password });
  };
  setEmail = (e) => {
    this.setState({
      ...this.state,
      email: e.target.value
    })
  };
  setPassword = (e) => {
    this.setState({
      ...this.state,
      password: e.target.value
    })
  };

  render = () => {
    if (this.props.loggedIn) {
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      return <Redirect to={from} />
    }
    return (
      <SignIn {...this} />
    );
  };
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
