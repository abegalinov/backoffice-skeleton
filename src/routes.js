import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Dashboard from './app.components/Dashboard';

export const AppRoutes = () => {
    return(
        <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Redirect exact from="/" to="/dashboard" />
        </Switch>
    );
};
