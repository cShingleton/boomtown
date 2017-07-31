import React from 'react';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Gravatar from 'react-gravatar';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import placeholder from '../../images/item-placeholder.jpg';

import './styles.css';

const ShareCard = ({ cardData, userData }) => (
    <div className="item-card-wrapper">
        <Card>
            <CardMedia>
                <img
                    src={(!cardData.imageurl) ? placeholder : cardData.imageurl}
                    alt=""
                />
            </CardMedia>
            <Link to={`/profile/${userData.id}`}>
                <CardHeader
                    className={'itemcard-header'}
                    title={userData.fullname}
                    subtitle={Moment().fromNow()}
                    avatar={<Gravatar email={userData.email} />}
                />
            </Link>
            <CardTitle
                title={(!cardData.title) ? 'Amazing Item Title' : cardData.title}
                subtitle={cardData.tags.join(', ')}
            />
            <CardText>
                {(!cardData.description) ? 'Profound Item Description' : cardData.description}
            </CardText>
        </Card>
    </div>
);

export default connect()(ShareCard);

ShareCard.propTypes = {
    cardData: PropTypes.shape({
        description: PropTypes.string.isRequired,
        imageurl: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired
    }).isRequired,
    userData: PropTypes.objectOf(PropTypes.string).isRequired
};
