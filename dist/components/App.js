import React from 'react';
import clsx from 'clsx';
import { Switch } from "react-router-dom";
import { connect } from 'react-redux';
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
import useStyles from "./styles";
import AppRoutes from './AppRoutes';
import AppNavigation from './AppNavigation';
import UserMenu from './UserMenu';
import AppTitle from './AppTitle';
export function App(props) {
  const {
    container
  } = props;
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

  return React.createElement("div", {
    className: classes.root
  }, React.createElement(CssBaseline, null), React.createElement(AppBar, {
    position: "fixed",
    className: classes.appBar
  }, React.createElement(Toolbar, null, React.createElement(IconButton, {
    color: "inherit",
    "aria-label": "navigation",
    edge: "start",
    onClick: () => {
      handleMobileDrawerToggle();
      handleDesktopDrawerToggle();
    },
    className: classes.menuButton
  }, React.createElement(MenuIcon, null)), React.createElement(Typography, {
    variant: "h6",
    className: classes.title
  }, React.createElement(AppTitle, {
    path: props.location.pathname
  })), React.createElement(UserMenu, null))), React.createElement("nav", {
    className: classes.drawer,
    "aria-label": "mailbox folders"
  }, React.createElement(Hidden, {
    smUp: true,
    implementation: "js"
  }, React.createElement(Drawer, {
    container: container,
    variant: "temporary",
    anchor: theme.direction === 'rtl' ? 'right' : 'left',
    open: mobileDrawerOpen,
    onClose: handleMobileDrawerToggle,
    classes: {
      paper: classes.drawerPaper
    },
    ModalProps: {
      keepMounted: true
    }
  }, React.createElement(Divider, null), React.createElement(AppNavigation, null))), React.createElement(Hidden, {
    xsDown: true,
    implementation: "js"
  }, React.createElement(Drawer, {
    classes: {
      paper: classes.drawerPaper
    },
    variant: "persistent",
    open: desktopDrawerOpen
  }, React.createElement(AppNavigation, null)))), React.createElement("main", {
    className: clsx(classes.content, {
      [classes.contentShift]: desktopDrawerOpen
    })
  }, React.createElement("div", {
    className: classes.toolbar
  }), React.createElement(Switch, null, React.createElement(AppRoutes, null))));
}
export default connect(state => ({
  loggedIn: state.login.loggedIn
}))(App);