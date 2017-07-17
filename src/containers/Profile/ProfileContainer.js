import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/';
import Profile from './Profile';
import { fetchAndRenderProfile } from '../../redux/modules/profile';
import { fetchAndRenderItems } from '../../redux/modules/items';
import Items from '../../containers/Items/Items';
import './styles.css';

class ProfileContainer extends Component {

    componentDidMount() {
        this.props.dispatch(fetchAndRenderProfile(this.props.match.params.id));
        this.props.dispatch(fetchAndRenderItems(this.props.match.params.id));
    }

    render() {
        if (this.props.loading) return <Loader />;
        return (
            <div className="profile-wrapper">
                <Profile userData={this.props.userData} itemsData={this.props.itemsData} />
                <Items itemsData={this.props.specificUserItems} />
            </div>
        );
    }
}

function mapStateFromProps(state) {
    return {
        loading: state.profile.loading,
        userData: state.profile.profileData,
        itemsData: state.items.itemsData,
        specificUserItems: state.items.specificUserItems
    };
}

export default connect(mapStateFromProps)(ProfileContainer);
