import React from 'react';

import { shallow } from 'enzyme';

import { Drawer } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import { App } from '../components/App';

describe('<App />', () => {
    it('initial state set', () => {
        const wrapper = shallow(<App />);

        expect(wrapper.find(Drawer).length).toBe(2);
        
        expect(wrapper.find(Drawer).first().props().variant).toBe('temporary');
        expect(wrapper.find(Drawer).last().props().variant).toBe('persistent');

        expect(wrapper.find(Drawer).first().props().open).toBe(false);
        expect(wrapper.find(Drawer).last().props().open).toBe(true);

        expect(wrapper.find('main').props().className).toMatch(/contentShift/);
    });
    it('menu click changes drawers state', () => {
        const wrapper = shallow(<App />);

        wrapper.find(IconButton).simulate('click');

        expect(wrapper.find(Drawer).first().props().open).toBe(true);
        expect(wrapper.find(Drawer).last().props().open).toBe(false);
        expect(wrapper.find('main').props().className).not.toMatch(/contentShift/);

        wrapper.find(IconButton).simulate('click');

        expect(wrapper.find(Drawer).first().props().open).toBe(false);
        expect(wrapper.find(Drawer).last().props().open).toBe(true);
        expect(wrapper.find('main').props().className).toMatch(/contentShift/);
    });
});
