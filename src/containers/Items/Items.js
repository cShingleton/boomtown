import React from 'react';
import PropTypes from 'prop-types';

import ItemCardList from '../../components/ItemCardList/';

const Items = ({ itemsData }) => (
    <ItemCardList itemsData={itemsData} />
);

export default Items;

Items.propTypes = {
    itemsData: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired
};

