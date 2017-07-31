import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SignUpForm from './SignUpForm';
import { FireBaseAuth } from '../../config/firebase';

class SignUpFormContainer extends Component {

    login({ email, password }) {
        FireBaseAuth.signInWithEmailAndPassword(email, password)
        .catch(error => console.log(error));
    }

    // signUpUser(event) {
    //     event.preventDefault();
    //     this.props.mutate({
    //         variables: {
    //             fullname: 'Dan',
    //             email: 'dan@gmail.com',
    //             bio: 'I like stuff',
    //             password: 'password'
    //         }
    //     }).then(({ data }) => {
    //         this.login({ email: 'test@gmail.com', password: 'password' });
    //     }).catch(error => {
    //         console.log(error);
    //     });
    }

    render() {
        return <SignUpForm signUp={(event) => this.signUpUser(event)} />;
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

const SignUpWithData = graphql(addUser)(SignUpFormContainer);
export default SignUpWithData;
