import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { Redirect } from 'react-router-dom';
import { FireBaseAuth } from '../../config/firebase'; // FireBaseDB
import { showLoginError, showSignUpModal } from '../../redux/modules/auth';
import Login from './Login';
import SignUpForm from '../SignUpForm/SignUpForm';

class LoginContainer extends Component {

    // TO DO: ADD ERROR HANDLING AND MESSAGING
    Login = ({ email, password }) => {
        FireBaseAuth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            // this tells us that the login failed - the user was not found
            // could augment this with more specific errors -- check the firebase docs
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
        // if (this.props.userProfile) return <Redirect to={'/'} />;
        return (
            <Login
                login={(e) => {
                    e.preventDefault();
                    this.Login({ email: 'tet@test.com', password: 'testing' });
                }}
                handleOpen={showSignUpModal}
            >
                {(this.props.showJoinModal) ?
                    <SignUpForm
                        openModal={this.props.showJoinModal}
                        handleClose={showSignUpModal}
                    />
                : null}
            </Login>
        );
    }
}

const mapStateToProps = state => ({
    showJoinModal: state.auth.showJoinModal,
    userProfile: state.auth.userProfile
});

export default connect(mapStateToProps)(LoginContainer);
