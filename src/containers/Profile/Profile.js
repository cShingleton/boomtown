import React from 'react';
import { Route } from 'react-router-dom';
import './styles.css';

const Profile = ({ match }) => (
    <div>
        <h1>Profiles Will Go Here</h1>
        <Route path={`${match.url}/:name`} render={({ match }) => <h2>{match.params.name}</h2>} />
    </div>
);

export default Profile;
