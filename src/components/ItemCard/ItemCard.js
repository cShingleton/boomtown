import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Gravatar from 'react-gravatar';
import Moment from 'moment';
import './styles.css';

const checkBorrower = ({ itemData }) => {
    let status = '';
    const simulID = 'LAi9TYWxgGhbjgHu1Sm6ZvB1tRP2'; // Simulated user - Mandi
    if (itemData.borrower) {
        if (itemData.itemOwner.id === simulID) {
            const borrower = itemData.itemBorrower.fullName;
            status = `LENT TO ${borrower.toUpperCase()}`;
        } else {
            status = 'UNAVAILABLE';
        }
    }
    return status;
};

const ItemCard = ({ itemData }) => (
    <div className="item-card-wrapper">
        <Card key={itemData.id}>
            <CardMedia
                overlay={
                    (!itemData.available) ? <CardTitle subtitle={checkBorrower({ itemData })} /> : null
                }
            >
                <img src={itemData.imageUrl} alt="" />
            </CardMedia>
            <CardHeader
                className={'itemcard-header'}
                title={itemData.itemOwner.fullName}
                subtitle={Moment.unix(itemData.createdOn).fromNow()}
                avatar={<Gravatar email={itemData.itemOwner.email} />}
            />
            <CardTitle title={itemData.title} subtitle={itemData.tags} />
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
