import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FireBaseAuth } from '../../config/firebase'; // FireBaseDB
import { showLoginError, showSignUpModal } from '../../redux/modules/auth';
import { captureEmailInput, capturePasswordInput } from '../../redux/modules/forms';
import Login from './Login';
import SignUpForm from '../SignUpForm';

class LoginContainer extends Component {

    // TO DO: ADD ERROR HANDLING AND MESSAGING
    Login = ({ email, password }) => {
        FireBaseAuth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                this.props.dispatch(showSignUpModal(true));
            } else {
                // this tells us FireBase failed entirely
                this.props.dispatch(showLoginError(true));
            }
        });
    }

    // Join = ({ email, password }) => {
    //     FireBaseAuth.createUserWithEmailAndPassword(email, password)
    //     .catch(error => {
    //         // Handle Errors here.
    //     });
    // };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        if (this.props.authenticated) {
            return (
                <Redirect to={from} />
            );
        }
        return (
            <Login
                login={(e) => {
                    e.preventDefault();
                    this.Login({ email: this.props.email, password: this.props.password });
                }}
                handleOpen={showSignUpModal}
                captureEmail={captureEmailInput}
                capturePassword={capturePasswordInput}
            >
                {(this.props.showJoinModal) ?
                    <SignUpForm />
                : null}
            </Login>
        );
    }
}

const mapStateToProps = state => ({
    showJoinModal: state.auth.showJoinModal,
    authenticated: state.auth.userProfile,
    email: state.form.email,
    password: state.form.password
});

export default connect(mapStateToProps)(LoginContainer);

LoginContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    authenticated: PropTypes.string.isRequired,
    location: PropTypes.objectOf(PropTypes.string).isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    showJoinModal: PropTypes.bool.isRequired
};
