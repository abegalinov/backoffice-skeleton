import React from 'react';
import AppContext from '../AppContext';

function AppTitle(props) {
  return React.createElement(AppContext.Consumer, null, context => context.getTitleForPath(props.path));
}

export default AppTitle;