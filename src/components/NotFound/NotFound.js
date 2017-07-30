import React from 'react';
import './styles.css';
import ghost from '../../images/missingGhost.png';

const NotFound = () => (

    <div className="missing-wrapper">
        <div className="ghost-wrapper">
            <img id="missing-ghost-image" src={ghost} alt="Ghost for 404 page" />
            <h1 id="ghost-image-caption">Where did it go...?</h1>
        </div>
        <div>
            <h4 id="missing-error-message">You found a 404! Sadly, this page does not seem to exist.</h4>
        </div>
    </div>

);

export default NotFound;
