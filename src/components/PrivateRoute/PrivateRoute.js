import React from 'react';
import { connect } from 'react-redux';
import {
    Route,
    Redirect
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, userProfile, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            
             return userProfile
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
        }}
    />
);

const mapStateToProps = state => ({
    userProfile: state.auth.userProfile
});

export default connect(mapStateToProps)(PrivateRoute);
