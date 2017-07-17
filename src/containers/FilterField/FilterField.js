import React from 'react';
import { SelectField, MenuItem } from 'material-ui';

function toggleFiltering(itemTag, appliedTags, applyFiltering, removeFiltering) {
    if (appliedTags === undefined || appliedTags.indexOf(itemTag) === -1) {
        applyFiltering(itemTag, appliedTags);
    } else if (appliedTags.indexOf(itemTag) > -1) {
        removeFiltering(itemTag, appliedTags);
    }
}

const FilterField = ({ applyFiltering, removeFiltering, appliedTags }) => (
    <SelectField
        multiple={true}
        floatingLabelText="Filter By Tag"
    >
        <MenuItem
            value={1}
            primaryText="Electronics"
            onClick={() => toggleFiltering('Electronics', appliedTags, applyFiltering, removeFiltering)}
        />
        <MenuItem
            value={2}
            primaryText="Household Items"
            onClick={() => toggleFiltering('Household Items', appliedTags, applyFiltering, removeFiltering)}
        />
        <MenuItem
            value={3} 
            primaryText="Musical Instruments" 
            onClick={() => toggleFiltering('Musical Instruments', appliedTags, applyFiltering, removeFiltering)} 
        />
        <MenuItem
            value={4} 
            primaryText="Physical Media" 
            onClick={() => toggleFiltering('Physical Media', appliedTags, applyFiltering, removeFiltering)} 
        />
        <MenuItem
            value={5}
            primaryText="Recreational Equipment" 
            onClick={() => toggleFiltering('Recreational Equipment', appliedTags, applyFiltering, removeFiltering)} 
        />
        <MenuItem
            value={6}
            primaryText="Sporting Goods" 
            onClick={() => toggleFiltering('Sporting Goods', appliedTags, applyFiltering, removeFiltering)} 
        />
        <MenuItem
            value={7} 
            primaryText="Tools"
            onClick={() => toggleFiltering('Tools', appliedTags, applyFiltering, removeFiltering)} 
        />
    </SelectField>
);

export default FilterField;
