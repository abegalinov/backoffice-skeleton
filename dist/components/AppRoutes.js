import React from 'react';
import { Route } from "react-router-dom";
import AppContext from '../AppContext';
export class AppRoutes extends React.Component {
  render() {
    return this.context.getResources().map(resource => React.createElement(Route, {
      key: resource.path,
      path: resource.path,
      exact: true,
      component: resource.component
    }));
  }

}
AppRoutes.contextType = AppContext;
export default AppRoutes;