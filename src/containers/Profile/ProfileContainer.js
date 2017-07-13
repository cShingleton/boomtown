import React, { Component } from 'react';
import Loader from '../../components/Loader/';
import Profile from './Profile';

class ProfileContainer extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            userData: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:3001/users')
                .then(response => response.json())
                .then(json => {
                    const users = json;
                    const matchedId = this.props.match.params.id;

                    const soughtUser = users.filter((obj) => {
                        return obj.id === matchedId;
                    });

                    this.setState({
                        userData: soughtUser[0],
                        loading: false
                    });
                }).catch(err => console.log(err));
    }

    render() {
        if (this.state.loading) return <Loader />;
        return <Profile userData={this.state.userData} />;
        // matchUrl={this.props.match.params}
    }

}

export default ProfileContainer;
