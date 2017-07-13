import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Gravatar from 'react-gravatar';
import Moment from 'moment';
import './styles.css';

const ItemCard = ({ itemData }) => (
    <div className="item-card-wrapper">
        <Card key={itemData.id}>
            <CardMedia>{/* overlay={<CardTitle title={itemData.available}*/}
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
            <CardActions>
                <FlatButton label="Borrow" />
            </CardActions>
        </Card>
    </div>
);

export default ItemCard;
