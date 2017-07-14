import React, { Component } from 'react';
import Loader from '../../components/Loader/';
import Profile from './Profile';
import NotFound from '../NotFound/';

class ProfileContainer extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            userData: []
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3001/users/${this.props.match.params.id}`)
                .then(response => response.json())
                .then(json => {
                    const user = json;

                    this.setState({
                        userData: user,
                        loading: false
                    });
                }).catch(err => console.log(err)); 
                //add my notfound page and update state to undefined 
    }
    //redirect router 

    render() {
        if (this.state.loading) return <Loader />;
        if (this.state.userData === undefined) return <NotFound />;
        return <Profile userData={this.state.userData} />;
        // matchUrl={this.props.match.params}
    }

}

export default ProfileContainer;
