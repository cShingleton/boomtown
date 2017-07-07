import React from 'react';
import Masonry from 'react-masonry-component';
import ItemCard from '../ItemCard/';
import './styles.css';

const ItemCardList = ({ itemsData }) => (
    <div className="itemCardList-wrapper">
        <Masonry>
            {itemsData.map(item =>
                (<ItemCard itemData={item} />)
            )}
        </Masonry>
    </div>
);

export default ItemCardList;
