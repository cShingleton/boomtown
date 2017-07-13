import React, { Component } from 'react';
import Profile from './Profile';

class ProfileContainer extends Component {
    render() {
        return (
            <Profile matchUrl={this.props.match.params} />
        );
    }
}

export default ProfileContainer;
