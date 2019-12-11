import React from 'react';
import { Route, MemoryRouter as Router } from "react-router-dom";
import { shallow, mount } from 'enzyme';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AppRoutes from '../../components/AppRoutes';
import AppContext from '../../AppContext';
const mockAppContextValue = {
  getResources: () => []
};
describe('<AppRoutes />', () => {
  it('can mount', () => {
    mount(React.createElement(Router, null, React.createElement(AppContext.Provider, {
      value: mockAppContextValue
    }, React.createElement(AppRoutes, null))));
  });
  it('renders routes', () => {
    let contextValue = mockAppContextValue;

    contextValue.getResources = () => [{
      path: "/",
      component: () => React.createElement("h1", null, "test"),
      icon: DashboardIcon,
      title: "Dashboard"
    }];

    const wrapper = mount(React.createElement(Router, null, React.createElement(AppContext.Provider, {
      value: contextValue
    }, React.createElement(AppRoutes, null))));
    expect(wrapper.find(Route).length).toBe(1);
    expect(wrapper.find(Route).props().path).toBe("/");
  });
});