import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Gravatar from 'react-gravatar';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.css';

const checkBorrower = ({ itemData }) => {
    let status = '';
    const simulID = 'LAi9TYWxgGhbjgHu1Sm6ZvB1tRP2'; // Simulated user - Mandi
    if (itemData.borrower) {
        if (itemData.itemowner.id === simulID) {
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
                <img src={itemData.imageurl} alt="" />
            </CardMedia>
            <Link to={`/profile/${itemData.itemowner.id}`}>
                <CardHeader
                    className={'itemcard-header'}
                    title={itemData.itemowner.fullname}
                    subtitle={Moment(itemData.created, 'YYYYMMDD').fromNow()}
                    avatar={<Gravatar email={itemData.itemowner.email} />}
                />
            </Link>
            <CardTitle
                title={itemData.title}
                subtitle={itemData.tags.map(tag => tag.title).join(', ')}
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

export default connect()(ItemCard);

ItemCard.propTypes = {
    itemData: PropTypes.shape({
        available: PropTypes.bool.isRequired,
        borrower: PropTypes.objectOf(PropTypes.string),
        created: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        imageurl: PropTypes.string.isRequired,
        itemowner: PropTypes.shape({
            id: PropTypes.string.isRequired,
            fullname: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        }).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired
    }).isRequired
};
