import React from 'react';
import { Route, MemoryRouter as Router } from "react-router-dom";

import { shallow, mount } from 'enzyme';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AppRoutes from '../../components/AppRoutes';
import AppContext from '../../AppContext';

const mockAppContextValue = { getResources: () => []};

describe('<AppRoutes />', () => {
    it('can mount', () => {
        mount(
            <Router>
                <AppContext.Provider value={ mockAppContextValue }>
                    <AppRoutes />
                </AppContext.Provider>
            </Router>
        );
    });
    it('renders routes', () => {
        let contextValue = mockAppContextValue;
        contextValue.getResources = () => [{ 
            path: "/", 
            component: () => (<h1>test</h1>), 
            icon: DashboardIcon, 
            title: "Dashboard" 
        }];

        const wrapper = mount(
            <Router>
                <AppContext.Provider value={ contextValue }>
                    <AppRoutes />
                </AppContext.Provider>
            </Router>
        );

        expect(wrapper.find(Route).length).toBe(1);
        expect(wrapper.find(Route).props().path).toBe("/");
    });
});
