import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Items from './Items';
import Loader from '../../components/Loader';
import { fetchAndRenderItems } from '../../redux/modules/items';

class ItemsContainer extends Component {

    componentDidMount() {
        this.props.dispatch(fetchAndRenderItems());
    }

    filterItemsByTags() {
        const itemFilters = this.props.itemFilters;
        const items = this.props.itemsData;

        if (itemFilters.length) {
            return items.filter(item => item.tags.find(tag => itemFilters.includes(tag)));
        }
        return items;
    }

    render() {
        const { loading } = this.props.loading;
        if (loading) return <Loader />;
        const filteredItemsData = this.filterItemsByTags();
        return <Items itemsData={filteredItemsData} />;
    }
}

function mapStateFromProps(state) {
    return {
        loading: state.items.loading,
        itemsData: state.items.itemsData,
        itemFilters: state.items.itemFilters
    };
}

export default connect(mapStateFromProps)(ItemsContainer);

ItemsContainer.propTypes = {
    loading: PropTypes.bool.isRequired,
    itemsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    itemFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
    dispatch: PropTypes.func.isRequired
};
