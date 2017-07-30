import React from 'react';
import { connect } from 'react-redux';
import { SelectField, MenuItem } from 'material-ui';
import PropTypes from 'prop-types';

const FilterField = ({ selectValues, dispatch, onChangeAction }) => {
    const tags = ['Electronics', 'Household Items', 'Musical Instruments', 'Sporting Goods',
        'Recreational Equipment', 'Physical Media', 'Tools'];

    return (
        <SelectField
            multiple
            hintText={'Filter By Tag'}
            value={selectValues}
            onChange={(event, index, values) => dispatch(onChangeAction(values, selectValues))}
        >
            {tags.map(tag => (
                <MenuItem
                    key={tag}
                    insetChildren
                    checked={selectValues && selectValues.includes(tag)}
                    value={tag}
                    primaryText={tag}
                />
            ))}
        </SelectField>
    );
};


export default connect()(FilterField);

FilterField.propTypes = {
    selectValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    dispatch: PropTypes.func.isRequired,
    onChangeAction: PropTypes.func.isRequired,
};
