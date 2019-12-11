import React from 'react';
import { Switch, Route, MemoryRouter as Router } from "react-router-dom";
import { mount } from 'enzyme';
import { LoginRequiredRoute } from '../../components/LoginRequiredRoute';

const LoginComponent = () => React.createElement("h1", null, "login");

const SecuredComponent = () => React.createElement("h2", null, "secured");

describe('<LoginRequiredRoute />', () => {
  it('redirects to login if not logged in', () => {
    const wrapper = mount(React.createElement(Router, null, React.createElement(Switch, null, React.createElement(Route, {
      path: "/login/",
      component: LoginComponent
    }), React.createElement(LoginRequiredRoute, {
      component: SecuredComponent
    }))));
    expect(wrapper.contains(React.createElement("h1", null, "login"))).toBe(true);
    expect(wrapper.contains(React.createElement("h2", null, "secured"))).toBe(false);
  });
  it('renders secured component if logged in', () => {
    const wrapper = mount(React.createElement(Router, null, React.createElement(Switch, null, React.createElement(Route, {
      path: "/login/",
      component: LoginComponent
    }), React.createElement(LoginRequiredRoute, {
      loggedIn: "true",
      component: SecuredComponent
    }))));
    expect(wrapper.contains(React.createElement("h2", null, "secured"))).toBe(true);
    expect(wrapper.contains(React.createElement("h1", null, "login"))).toBe(false);
  });
});