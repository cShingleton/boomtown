import React from 'react';
import Masonry from 'react-masonry-component';
import PropTypes from 'prop-types';

import ItemCard from '../ItemCard/';
import './styles.css';

const ItemCardList = ({ itemsData }) => (
    <div className="itemCardList-wrapper">
        <Masonry>
            {itemsData.map(item =>
                (<ItemCard itemData={item} key={item.id} />)
            )}
        </Masonry>
    </div>
);

export default ItemCardList;

ItemCardList.propTypes = {
    itemsData: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired
};
