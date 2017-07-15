import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/';
import Profile from './Profile';
import { fetchAndRenderProfile } from '../../redux/modules/profile';
import { fetchAndRenderItems } from '../../redux/modules/items';

class ProfileContainer extends Component {

    componentDidMount() {
        this.props.dispatch(fetchAndRenderProfile(this.props.match.params.id));
        this.props.dispatch(fetchAndRenderItems());
        
        
    }

    render() {
        if (this.props.loading) return <Loader />;
        return <Profile userData={this.props.userData} itemsData={this.props.itemsData} />;
    }
}

function mapStateFromProps(state) {
    return {
        loading: state.profile.loading,
        userData: state.profile.profileData,
        itemsData: state.items.itemsData
    };
}

export default connect(mapStateFromProps)(ProfileContainer);
