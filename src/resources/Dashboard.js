import React from 'react';
import { connect } from 'react-redux';

function Dashboard(props) {
    return (
        <h1>Dashboard</h1>
    );
}

export default connect(
    state => ({
      loggedIn: state.loggedIn,
    }),
    {
    }
  )(Dashboard);