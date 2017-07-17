import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from './Items';
import Loader from '../../components/Loader';
import { fetchAndRenderItems } from '../../redux/modules/items';

class ItemsContainer extends Component {

    componentDidMount() {
        this.props.dispatch(fetchAndRenderItems());
    }

    render() {
        if (this.props.loading) return <Loader />;
        if (!this.props.filterValues) return <Items itemsData={this.props.itemsData} />;
        return <Items itemsData={this.props.filterValues} />;
    }
}

function mapStateFromProps(state) {
    return {
        loading: state.items.loading,
        itemsData: state.items.itemsData,
        filterValues: state.items.filterValues
    };
}

export default connect(mapStateFromProps)(ItemsContainer);

// ADD PROP TYPE VALIDATION HERE !
