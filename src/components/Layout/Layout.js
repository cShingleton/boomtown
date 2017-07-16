import React from 'react';
import PropTypes from 'prop-types';
import HeaderBar from '../HeaderBar';
import './styles.css';

const Layout = ({ children }) => (
    <div className="appContentWrapper">
        <div className="appHeader">
            {(window.location.pathname === '/login' || window.location.pathname === '/login/') ?
                 null : <HeaderBar />
            }
        </div>
        <div className="appContent">
            {children}
        </div>
            {/*// import footer component here*/}
    </div>
);

Layout.defaultProps = {
    children: null
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
