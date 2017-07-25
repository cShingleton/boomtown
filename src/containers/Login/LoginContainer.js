import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FireBaseAuth } from '../../config/firebase'; //FireBaseDB 
import { showLoginError } from '../../redux/modules/auth';
import Login from './Login';

class LoginContainer extends Component {

    // static propTypes = {
    // };

    // TO DO: ADD ERROR HANDLING AND MESSAGING
    Login = ({ email, password }) => {
        FireBaseAuth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            // this tells us that the login failed - the user was not found
            // could augment this with more specific errors -- check the firebase docs
            if (error.code === 'auth/user-not-found') {
                this.props.dispatch(showLoginError(true));
            } else {
                // this tells us FireBase failed entirely
                const errorMessage = error.message;
                console.log(errorMessage);
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
        this.Login({ email: 'test@test.com', password: 'testing' });
        
        if (this.props.userProfile) {
            return (
                <Redirect to={'/'} />
            );
        }
        
        return (
            <Login login={this.login} />
        );
    }
}

const mapStateToProps = state => ({
    userProfile: state.auth.userProfile
});

export default connect(mapStateToProps)(LoginContainer);
