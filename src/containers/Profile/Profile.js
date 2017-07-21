import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import PropTypes from 'prop-types';
import Gravatar from 'react-gravatar';
import './styles.css';

// const retrieveBorrowedNum = userData => userData.borrowed.length;

// const retrieveSharedNum = userData => userData.items.length;

const retrieveCurrentlyBorrowing = userData => userData.borrowed.map(item =>
    <li key={item.id}>{item.title} from {item.itemOwner.fullName}</li>
);

const Profile = ({ userData }) => (
    <div className="card-wrapper">
        <Card>
            <div className="item-status-info">
                <CardTitle
                    title={userData.fullName}
                    subtitle={userData.bio}
                />
                <div>
                    <CardTitle
                        title={'Currently borrowing:'}
                        subtitle={
                            <ul>
                                {retrieveCurrentlyBorrowing(userData)}
                            </ul>
                        }
                    />
                </div>
            </div>
            <div className="share-stats">
                <CardTitle
                    title={userData.items.length}
                    subtitle={'Items Shared'}
                />
                <CardTitle
                    title={userData.borrowed.length}
                    subtitle={'Items Borrowed'}
                />
            </div>
            <div className="profile-img-holder">
                <Gravatar email={userData.email} className="profile-avatar" size={180} /> 
            </div>
        </Card>
    </div>
);

export default Profile;

Profile.propTypes = {
    userData: PropTypes.shape({
        bio: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
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
        })),
        borrowed: PropTypes.arrayOf(PropTypes.shape({
            itemOwner: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
            title: PropTypes.string.isRequired
        }))
    }).isRequired
};
