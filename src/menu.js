import React from 'react';

import ListIcon from '@material-ui/icons/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import List from '@material-ui/core/List';

import { ListItemLink } from "./core.components/ListItemLink";

export const NavMenu = () => {
    return (
    <List>
        <ListItemLink to="/dashboard" primary="Dashboard" icon={<DashboardIcon />} />
        <ListItemLink to="/categories" primary="Categories" icon={<ListIcon />} />
    </List>
    );
};
