import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Gravatar from 'react-gravatar';
import Moment from 'moment';
import PropTypes from 'prop-types';

import './styles.css';

const checkBorrower = ({ itemData }) => {
    let status = '';
    const simulID = 'LAi9TYWxgGhbjgHu1Sm6ZvB1tRP2'; // Simulated user - Mandi
    if (itemData.borrower) {
        if (itemData.itemOwner.id === simulID) {
            const borrower = itemData.borrower.fullname;
            status = `LENT TO ${borrower.toUpperCase()}`;
        } else {
            status = 'UNAVAILABLE';
        }
    }
    return status;
};

const ItemCard = ({ itemData }) => (
    <div className="item-card-wrapper">
        <Card>
            <CardMedia
                overlay={
                    (!itemData.available) ? <CardTitle subtitle={checkBorrower({ itemData })} /> : null
                }
            >
                <img src={itemData.imageUrl} alt="" />
            </CardMedia>
            <a target={'_self'} href={`/profile/${itemData.itemOwner.id}`}>
                <CardHeader
                    className={'itemcard-header'}
                    title={itemData.itemOwner.fullname}
                    subtitle={Moment.unix(itemData.createdOn).fromNow()}
                    avatar={<Gravatar email={itemData.itemOwner.email} />}
                />
            </a>
            <CardTitle
                title={itemData.title}
                subtitle={itemData.tags.join(', ')}
            />
            <CardText>
                {itemData.description}
            </CardText>
            {(itemData.available) ? <CardActions>
                <FlatButton label="Borrow" />
            </CardActions> : null}
        </Card>
    </div>
);

export default ItemCard;

ItemCard.propTypes = {
    itemData: PropTypes.shape({
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
    }).isRequired
};
