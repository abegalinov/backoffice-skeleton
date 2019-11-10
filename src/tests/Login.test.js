import React from 'react';
import { Redirect } from 'react-router-dom';

import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import { Login } from '../core.components/Login';

describe('<Login />', () => {
    it('can mount', () => {
        mount(<Login />);
    });
    it('redirects if logged in to return path', () => {
        const routerLocation = {
            state: {
                from : 'test'
            } 
        };
        const wrapper = shallow(<Login loggedIn="true" location={routerLocation} />);

        expect(wrapper.exists(Redirect)).toBe(true);
        expect(wrapper.find(Redirect).props().to).toBe("test");
    });
    it('redirects if logged in to default', () => {
        const wrapper = shallow(<Login loggedIn="true" location={new Object()} />);

        expect(wrapper.exists(Redirect)).toBe(true);
        expect(wrapper.find(Redirect).props().to.pathname).toBe('/');
    });
    it('progressbar displayed when loading', () => {
        const wrapper = shallow(<Login loading="true" />);

        expect(wrapper.exists(CircularProgress)).toBe(true);
    });
    it('pextfields are highlighted when error', () => {
        const wrapper = shallow(<Login error="cannot login" />);

        expect(wrapper.find(TextField).first().props().error).toBe(true);
        expect(wrapper.find(TextField).last().props().error).toBe(true);
    });
    it('pextfields are highlighted when error', () => {
        const wrapper = shallow(<Login error="cannot login" />);

        expect(wrapper.find(TextField).first().props().error).toBe(true);
        expect(wrapper.find(TextField).last().props().error).toBe(true);
    });
    it('pextfields are highlighted when error', () => {
        const onSubmitClick = sinon.spy();
        const wrapper = mount(<Login loginProcess={onSubmitClick} />);

        wrapper.find('input').first().instance().value = 'tester';
        wrapper.find('input').last().instance().value = 'password';
        wrapper.find('button').simulate('click');

        expect(onSubmitClick.calledOnce).toBe(true);
        expect(onSubmitClick.getCall(0).args[0].username).toBe('tester');
        expect(onSubmitClick.getCall(0).args[0].password).toBe('password');
    });
});
