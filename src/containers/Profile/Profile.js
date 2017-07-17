import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import Gravatar from 'react-gravatar';
import './styles.css';

const retrieveBorrowedNum = (userData, itemsData) => {
    const borrowed = itemsData.filter(item => userData.id === item.borrower);
    return borrowed.length;
};

const retrieveSharedNum = (userData, itemsData) => {
    const shared = itemsData.filter(item => userData.id === item.itemOwner.id);
    return shared.length;
};

const retrieveCurrentlyBorrowing = (userData, itemsData) => {
    const borrowed = itemsData.filter(item => userData.id === item.borrower);
    return borrowed.map(item => {
        return (
            <li>{item.title} from {item.itemOwner.fullName}</li>
        );
    });
};

const Profile = ({ userData, itemsData }) => (
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
                                {retrieveCurrentlyBorrowing(userData, itemsData)}
                            </ul>
                        }
                    />
                </div>
            </div>
            <div className="share-stats">
                <CardTitle
                    title={retrieveSharedNum(userData, itemsData)}
                    subtitle={'Items Shared'}
                />
                <CardTitle
                    title={retrieveBorrowedNum(userData, itemsData)}
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
