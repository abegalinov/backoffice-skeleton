import React from 'react';

import useStyles from "../styles";
import { NavMenu } from "../menu";

function Navigation() {
  const classes = useStyles();
  return (
  <div>
      <div className={classes.toolbar} />
      <NavMenu />
  </div>
  );
}

export default Navigation;
