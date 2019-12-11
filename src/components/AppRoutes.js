import React from 'react';
import { Route } from "react-router-dom";

import AppContext from '../AppContext';

export class AppRoutes extends React.Component {
  render() {
    return this.context.getResources().map(resource => (
      <Route key={resource.path} path={resource.path} exact component={resource.component} />
    ));
  }
}

AppRoutes.contextType = AppContext;

export default AppRoutes;
