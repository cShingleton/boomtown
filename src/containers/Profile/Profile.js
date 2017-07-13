import React from 'react';
import './styles.css';

const Profile = ({ matchUrl }) => (
    <div>
        <h2>Hi {matchUrl.id}!</h2>
    </div>
);

export default Profile;
