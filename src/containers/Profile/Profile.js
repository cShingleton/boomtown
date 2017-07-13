import React from 'react';
import './styles.css';

// matchUrl

const Profile = ({ userData }) => (
    <div>
        <h2>Hi {userData.fullName}</h2>
        <p>Your email is {userData.email}</p>
    </div>
);

export default Profile;
