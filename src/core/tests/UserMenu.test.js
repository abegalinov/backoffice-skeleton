import React from 'react';

import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import { UserMenu } from '../components/UserMenu';

describe('<UserMenu />', () => {
    it('can mount', () => {
        mount(<UserMenu />);
    });
    it('initial state set', () => {
        const wrapper = mount(<UserMenu />);

        expect(wrapper.find(Menu).length).toBe(1);
        expect(wrapper.find(Menu).first().props().open).toBe(false);
        expect(wrapper.find(Menu).first().props().anchorEl).toBe(null);
    });
    it('menu is opening', () => {
        const wrapper = mount(<UserMenu />);

        wrapper.find(IconButton).simulate('click');
        
        expect(wrapper.find(Menu).first().props().open).toBe(true);
        expect(wrapper.find(Menu).first().props().anchorEl.type).toBe('button');
    });
    it('logout works properly', () => {
        const logoutFunction = sinon.spy();

        const wrapper = mount(<UserMenu logoutProcess={logoutFunction} />);

        wrapper.find(IconButton).simulate('click');
        wrapper.find(MenuItem).first().simulate('click')
        
        expect(wrapper.find(Menu).first().props().open).toBe(false);
        expect(logoutFunction.calledOnce).toBe(true);
    });
});
