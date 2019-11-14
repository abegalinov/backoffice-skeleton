import React from 'react';
import AppContext from '../AppContext';

function AppTitle(props) {
  return (
    <AppContext.Consumer>
        {context => (context.getTitleForPath(props.path))}
    </AppContext.Consumer>
  );
}

export default AppTitle;
