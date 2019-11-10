import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import { AppRoutes } from '../routes';
import useStyles from "../styles";
import Navigation from './Navigation';
import UserMenu from './UserMenu';

export function App(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const [desktopDrawerOpen, setDesktopDrawerOpen] = React.useState(true);

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  const handleDesktopDrawerToggle = () => {
    setDesktopDrawerOpen(!desktopDrawerOpen);
  };

  return (
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="navigation"
            edge="start"
            onClick={() => { handleMobileDrawerToggle(); handleDesktopDrawerToggle(); }}
            className={classes.menuButton}
          >
           <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Administration
          </Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="js">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileDrawerOpen}
            onClose={handleMobileDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            <Divider />
            <Navigation />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="js">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="persistent"
            open={desktopDrawerOpen}
          >
            <Navigation />
          </Drawer>
        </Hidden>
      </nav>
      <main className={clsx(classes.content, {[classes.contentShift]: desktopDrawerOpen})}>
        <div className={classes.toolbar} />
        <AppRoutes />
      </main>
    </div>
    </Router>
  );
}

export default connect(
  state => ({
    loggedIn: state.login.loggedIn,
  })
)(App);
