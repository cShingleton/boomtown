import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterField from './FilterField';
import { filterItems, unfilterItems } from '../../redux/modules/items';

class FilterFieldContainer extends Component {

    applyFiltering(itemTag, appliedTags) {
        this.props.dispatch(filterItems(itemTag, appliedTags, this.props.filterValues, this.props.itemsData));
    }

    removeFiltering(itemTag, appliedTags) {
        this.props.dispatch(unfilterItems(itemTag, appliedTags, this.props.filterValues, this.props.itemsData));
    }

    render() {
        return (
            <FilterField
                applyFiltering={this.applyFiltering.bind(this)}
                removeFiltering={this.removeFiltering.bind(this)}
                appliedTags={this.props.appliedTags}
            />
        );
    }
}

function mapStateFromProps(state) {
    return {
        itemsData: state.items.itemsData,
        filterValues: state.items.filterValues,
        appliedTags: state.items.appliedTags
    };
}

export default connect(mapStateFromProps)(FilterFieldContainer);
