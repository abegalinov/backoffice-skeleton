import React from 'react';
import { mount, shallow } from 'enzyme';
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import { ListItemLink } from '../../components/ListItemLink';
describe('<ListItemLink />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(React.createElement(ListItemLink, {
      icon: React.createElement(ListIcon, null),
      primary: "test",
      to: "/test"
    }));
    expect(wrapper.exists(ListItem)).toBe(true);
    expect(wrapper.exists(ListItemIcon)).toBe(true);
    expect(wrapper.exists(ListItemText)).toBe(true);
    expect(wrapper.exists(ListIcon)).toBe(true);
  });
  it('functioning as expected', () => {
    const history = createMemoryHistory();
    const wrapper = mount(React.createElement(Router, {
      history: history
    }, React.createElement(ListItemLink, {
      to: "/test",
      primary: "test"
    })));
    wrapper.find(ListItem).simulate('click', {
      button: 0
    });
    expect(history.location.pathname).toBe("/test");
  });
});