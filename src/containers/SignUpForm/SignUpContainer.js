import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import SignUpForm from './SignUpForm';
import { FireBaseAuth } from '../../config/firebase';
import { showSignUpModal } from '../../redux/modules/auth';

import {
    captureTitleInput,
    captureDescriptionInput
} from '../../redux/modules/share';

class SignUpFormContainer extends Component {

    login(email, password) {
        FireBaseAuth.signInWithEmailAndPassword(email, password)
        .catch(error => console.log(error));
    }

    signUpUser(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                fullname: this.props.fullname,
                email: this.props.email,
                bio: this.props.bio,
                password: this.props.password
            }
        }).then(({ data }) => {
            this.login({ email: this.props.email, password: this.props.password });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <SignUpForm
                openModal={this.props.showJoinModal}
                handleClose={showSignUpModal}
                signUp={(event) => this.signUpUser(event)}
                captureTitle={captureTitleInput}
                captureDescription={captureDescriptionInput}
            />
        );
    }
}


const addUser = gql`
    mutation addUser(    
        $bio: String
        $email: String!
        $password: String!
        $fullname: String!
    ) {
        addUser(
            bio: $bio
            email: $email
            password: $password
            fullname: $fullname
        ) {
            bio
            fullname
            email
        }
    }
`;

const mapStateToProps = state => ({
    showJoinModal: state.auth.showJoinModal,
    bio: state.share.form.description,
    fullname: state.share.form.title,
    email: state.form.email,
    password: state.form.password
});

const SignUpFormWithData = graphql(addUser);
export default connect(mapStateToProps)(SignUpFormWithData(SignUpFormContainer));
