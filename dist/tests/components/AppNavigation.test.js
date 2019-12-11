import React from 'react';
import { Route, MemoryRouter as Router } from "react-router-dom";
import { shallow, mount } from 'enzyme';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AppNavigation from '../../components/AppNavigation';
import AppContext from '../../AppContext';
const mockAppContextValue = {
  getResources: () => []
};
describe('<AppNavigation />', () => {
  it('mounts with navigation', () => {
    let contextValue = mockAppContextValue;

    contextValue.getResources = () => [{
      path: "/",
      component: () => React.createElement("h1", null, "test"),
      icon: DashboardIcon,
      title: "Dashboard title",
      name: "Dashboard"
    }];

    mount(React.createElement(Router, null, React.createElement(AppContext.Provider, {
      value: contextValue
    }, React.createElement(AppNavigation, null))));
  });
});