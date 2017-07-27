import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Loader from '../../components/Loader/';
import Profile from './Profile';
import Items from '../../containers/Items/Items';
import './styles.css';
// import { fetchAndRenderProfile } from '../../redux/modules/profile';
// import { fetchAndRenderItems } from '../../redux/modules/items';


class ProfileContainer extends Component {

    // componentDidMount() {
        // this.props.dispatch(fetchAndRenderProfile(this.props.match.params.id));
        // this.props.dispatch(fetchAndRenderItems(this.props.match.params.id));
    // }

    render() {
        if (this.props.data.loading) return <Loader />;
        return (
            <div className="profile-wrapper">
                <Profile userData={this.props.data.user} />
                <Items itemsData={this.props.data.user.items} />
            </div>
        );
    }
}

const fetchUser = gql`
    query fetchUser($id: ID!) {
        user (id: $id) {
            id
            bio
            fullname
            email
            items {
                available
                borrower {
                    fullname
                }
                createdOn
                description
                id
                imageUrl
                itemOwner {
                    id
                    fullname
                    email
                }
                tags
                title
            }
            borrowed {
                id
                title 
                itemOwner {
                    fullname
                }
            }
        }
    }
`;

export default graphql(fetchUser, {
    options: ownProps => ({
        variables: {
            id: ownProps.match.params.id
        }
    })
})(ProfileContainer);


ProfileContainer.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        user: PropTypes.shape({
            bio: PropTypes.string.isRequired,
            fullname: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            items: PropTypes.arrayOf(PropTypes.shape({
                available: PropTypes.bool.isRequired,
                borrower: PropTypes.objectOf(PropTypes.string),
                createdOn: PropTypes.number.isRequired,
                description: PropTypes.string.isRequired,
                id: PropTypes.number.isRequired,
                imageUrl: PropTypes.string.isRequired,
                itemOwner: PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    fullname: PropTypes.string.isRequired,
                    email: PropTypes.string.isRequired
                }).isRequired,
                tags: PropTypes.arrayOf(PropTypes.string).isRequired,
                title: PropTypes.string.isRequired
            })),
            borrowed: PropTypes.arrayOf(PropTypes.shape({
                itemOwner: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
                title: PropTypes.string.isRequired
            }))
        })
    }).isRequired
};

// function mapStateFromProps(state) {
//     return {
//         loading: state.profile.loading,
//         // userData: state.profile.profileData,
//         // itemsData: state.items.itemsData,
//         specificUserItems: state.items.specificUserItems
//     };
// }
