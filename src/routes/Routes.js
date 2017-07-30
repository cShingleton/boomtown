import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../containers/Login';
import Items from '../containers/Items';
import NotFound from '../components/NotFound';
import Profile from '../containers/Profile';
import Share from '../containers/Share';

const Routes = () => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Items} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/share" component={Share} />
        <PrivateRoute component={NotFound} />
    </Switch>
);

export default Routes;
