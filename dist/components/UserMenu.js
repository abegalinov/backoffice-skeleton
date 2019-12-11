import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { logoutProcess } from '../state/loginActions';
export function UserMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    props.logoutProcess();
  };

  return React.createElement("div", null, React.createElement(IconButton, {
    "aria-label": "account of current user",
    "aria-controls": "menu-appbar",
    "aria-haspopup": "true",
    onClick: handleMenu,
    color: "inherit"
  }, React.createElement(AccountCircle, null)), React.createElement(Menu, {
    id: "menu-appbar",
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    keepMounted: true,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    open: open,
    onClose: handleClose
  }, React.createElement(MenuItem, {
    onClick: handleLogout
  }, "Logout")));
}
export default connect(state => ({}), {
  logoutProcess
})(UserMenu);