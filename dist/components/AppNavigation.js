import React from 'react';
import List from '@material-ui/core/List';
import { ListItemLink } from "./ListItemLink";
import useStyles from "./styles";
import AppContext from '../AppContext';

function AppNavigation() {
  const classes = useStyles();
  return React.createElement("div", null, React.createElement("div", {
    className: classes.toolbar
  }), React.createElement(AppContext.Consumer, null, context => React.createElement(List, null, context.getResources().map(resource => React.createElement(ListItemLink, {
    key: resource.path,
    to: resource.path,
    primary: resource.name,
    icon: React.createElement(resource.icon, null)
  })))));
}

export default AppNavigation;