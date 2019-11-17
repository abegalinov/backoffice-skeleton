import React from 'react';
import List from '@material-ui/core/List';

import { ListItemLink } from "./ListItemLink";
import useStyles from "./styles";
import AppContext from '../AppContext';

function AppNavigation() {
  const classes = useStyles();
  return (
    <div>
        <div className={classes.toolbar} />
        <AppContext.Consumer>
            {context => (
              <List>
                {context.getResources().map(resource => (
                  <ListItemLink key={resource.path} to={resource.path} primary={resource.name} icon={<resource.icon />} />        
                ))}
              </List>
            )}
        </AppContext.Consumer>
    </div>
  );
}

export default AppNavigation;
