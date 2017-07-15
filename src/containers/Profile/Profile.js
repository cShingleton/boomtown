import React from 'react';
import { Card } from 'material-ui/Card';
import './styles.css';

const retrieveBorrowedNum = (userData, itemsData) => {
    const borrowed = itemsData.filter(item => userData.id === item.borrower);
    return borrowed.length;
};

const retrieveSharedNum = (userData, itemsData) => {
    const shared = itemsData.filter(item => userData.id === item.itemOwner.id);
    return shared.length;
};

const retrieveCurrentlyBorrowing = ( userData, itemsData ) => {
    const borrowed = itemsData.filter(item => userData.id === item.borrower);
    return borrowed.map(item => {
        return (
            <li>{item.title} from {item.itemOwner.fullName}</li>
        );
    });
};

const Profile = ({ userData, itemsData }) => (
    <div className="profile">
        <Card>
            <div className="item-status-info">
                <h2>{userData.fullName}</h2>
                <p>{userData.bio}</p>
                <div>
                    <h3>Currently borrowing:</h3>
                    <ul>
                        {retrieveCurrentlyBorrowing(userData, itemsData)}
                    </ul>
                </div>
            </div>
            <div className="profile-details">
                <div className="share-stats">
                    <p><span>{retrieveSharedNum(userData, itemsData)}</span> Items Shared</p>
                    <p><span>{retrieveBorrowedNum(userData, itemsData)}</span> Items Borrowed</p>
                </div>
                <img src="" alt="" />
            </div>
        </Card>
    </div>
);

export default Profile;
