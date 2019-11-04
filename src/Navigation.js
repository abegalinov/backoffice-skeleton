import React from 'react';
import { connect } from 'react-redux';

import ListIcon from '@material-ui/icons/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import List from '@material-ui/core/List';
import useStyles from "./styles";

import { ListItemLink } from "./ListItemLink";

function Navigation(props) {
  const classes = useStyles();
  return (
  <div>
      <div className={classes.toolbar} />
      <List>
        <ListItemLink to="/dashboard" primary="Dashboard" icon={<DashboardIcon />} />
        <ListItemLink to="/categories" primary="Categories" icon={<ListIcon />} />
      </List>
  </div>
  );
}

export default connect(
  state => ({
    loggedIn: state.loggedIn,
  }),
  {
  }
)(Navigation);
