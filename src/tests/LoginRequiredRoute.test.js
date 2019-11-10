import React from 'react';
import { Switch, Route, MemoryRouter as Router } from "react-router-dom";

import { mount } from 'enzyme';

import { LoginRequiredRoute } from '../core.components/LoginRequiredRoute';

const LoginComponent = () =>(<h1>login</h1>);
const SecuredComponent = () =>(<h2>secured</h2>);

describe('<LoginRequiredRoute />', () => {
    it('redirects to login if not logged in', () => {
        const wrapper = mount(
            <Router>
             <Switch>
              <Route path="/login/" component={LoginComponent} />
              <LoginRequiredRoute component={SecuredComponent} />
             </Switch>
            </Router>
           );
        expect(wrapper.contains(<h1>login</h1>)).toBe(true);
        expect(wrapper.contains(<h2>secured</h2>)).toBe(false);
    });
    it('renders secured component if logged in', () => {
        const wrapper = mount(
            <Router>
             <Switch>
              <Route path="/login/" component={LoginComponent} />
              <LoginRequiredRoute loggedIn="true" component={SecuredComponent} />
             </Switch>
            </Router>
           );
        expect(wrapper.contains(<h2>secured</h2>)).toBe(true);
        expect(wrapper.contains(<h1>login</h1>)).toBe(false);
    });
});
