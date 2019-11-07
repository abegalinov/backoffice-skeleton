import React from 'react';
import { connect } from 'react-redux';

function Dashboard(props) {
  return (
        <h1>Hello {props.loggedIn.userName}</h1>
    );
}

export default connect(
    state => ({
      loggedIn: state.login.loggedIn,
    }),
    {
    }
  )(Dashboard);