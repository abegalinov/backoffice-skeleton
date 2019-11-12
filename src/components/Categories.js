import React from 'react';
import { connect } from 'react-redux';

function Categories(props) {
  return (
        <h1>Categories</h1>
    );
}

export default connect(
    state => ({
      loggedIn: state.login.loggedIn,
    }),
    {
    }
  )(Categories);