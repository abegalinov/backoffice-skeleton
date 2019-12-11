function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
export function ListItemLink(props) {
  const {
    icon,
    primary,
    to
  } = props;
  const renderLink = React.useMemo(() => React.forwardRef((itemProps, ref) => React.createElement(RouterLink, _extends({
    to: to
  }, itemProps, {
    innerRef: ref
  }))), [to]);
  return React.createElement("li", null, React.createElement(ListItem, {
    button: true,
    component: renderLink
  }, icon ? React.createElement(ListItemIcon, null, icon) : null, React.createElement(ListItemText, {
    primary: primary
  })));
}
ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};