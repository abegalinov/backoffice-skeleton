
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { changeLoggedIn } from './actions';

const Login = (props) => {
  if (props.loggedIn) {
    const { from } = props.location.state || { from: { pathname: '/' } }
    return <Redirect to={from} />
  }
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => { props.changeLoggedIn(true) }}>Login</button>
    </div>
  )
}

export default connect(
  state => ({
    loggedIn: state.loggedIn
  }),
  {
    changeLoggedIn,
  }
)(Login);
