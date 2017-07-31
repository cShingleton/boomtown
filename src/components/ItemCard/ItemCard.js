import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Gravatar from 'react-gravatar';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showBorrowModal } from '../../redux/modules/items';
import './styles.css';

const ItemCard = ({ itemData, userProfile, dispatch }) => (
    <div className="item-card-wrapper">
        <Card>
            <CardMedia
                overlay={
                    (itemData.borrower) ?
                        <CardTitle subtitle={
                            (itemData.itemowner.id === userProfile) ?
                                `LENT TO ${itemData.borrower.fullname.toUpperCase()}`
                                : 'UNAVAILABLE'
                        }
                        />
                    : null
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
                <FlatButton
                    label="Borrow"
                    onTouchTap={() => dispatch(showBorrowModal(true))}
                />
            </CardActions> : null}
        </Card>
    </div>
);

const mapStateToProps = state => ({
    userProfile: state.auth.userProfile
});

export default connect(mapStateToProps)(ItemCard);

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
