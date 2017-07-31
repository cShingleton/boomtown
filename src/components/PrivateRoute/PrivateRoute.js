import React from 'react';
import { connect } from 'react-redux';
import {
    Route,
    Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, userProfile, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            userProfile
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
        )}
    />
);

const mapStateToProps = state => ({
    userProfile: state.auth.userProfile
});

export default connect(mapStateToProps)(PrivateRoute);

PrivateRoute.propTypes = {
    userProfile: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    location: PropTypes.objectOf(PropTypes.string).isRequired
};
