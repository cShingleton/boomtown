import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Items from './Items';
import Loader from '../../components/Loader';
// import { fetchAndRenderItems } from '../../redux/modules/items';

class ItemsContainer extends Component {

    // componentDidMount() {
    //     this.props.dispatch(fetchAndRenderItems());
    // }

    filterItemsByTags() {
        const itemFilters = this.props.itemFilters;
        const items = this.props.data.items;

        if (itemFilters.length) {
            return items.filter(item => item.tags.find(tag => itemFilters.includes(tag)));
        }
        return items;
    }

    render() {
        const loading = this.props.data.loading;
        if (loading) return <Loader />;
        const filteredItemsData = this.filterItemsByTags();
        return <Items itemsData={filteredItemsData} />;
    }
}

const fetchItems = gql`
    query fetchItems {
         items {
            available
            borrower {
                fullName
            }
            createdOn
            description
            id
            imageUrl
            itemOwner {
                id
                fullName
                email
            }
            tags
            title
        } 
    }
`;


function mapStateFromProps(state) {
    return {
        // loading: state.items.loading,
        // itemsData: state.items.itemsData,
        itemFilters: state.items.itemFilters
    };
}

const ItemsDataList = graphql(fetchItems)(ItemsContainer);
export default connect(mapStateFromProps)(ItemsDataList);

ItemsContainer.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
            available: PropTypes.bool.isRequired,
            borrower: PropTypes.objectOf(PropTypes.string),
            createdOn: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            imageUrl: PropTypes.string.isRequired,
            itemOwner: PropTypes.shape({
                id: PropTypes.string.isRequired,
                fullName: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired
            }).isRequired,
            tags: PropTypes.arrayOf(PropTypes.string).isRequired,
            title: PropTypes.string.isRequired
        }))
    }).isRequired,
    itemFilters: PropTypes.arrayOf(PropTypes.string).isRequired
};
