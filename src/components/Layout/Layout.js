import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderBar from '../HeaderBar';
import './styles.css';

// TODO: change window.location to use React Router
const Layout = ({ children, pathname }) => (
    <div className="appContentWrapper">
        <div className="appHeader">
            {(pathname === '/login' || pathname === '/login/') ?
                 null : <HeaderBar />
            }
        </div>
        <div className="appContent">
            {children}
        </div>
        {/* // import footer component here*/}
    </div>
);

const mapStateFromProps = (state) => ({
    pathname: state.router.location.pathname
});

export default connect(mapStateFromProps)(Layout);

Layout.defaultProps = {
    children: null
};

Layout.propTypes = {
    children: PropTypes.node,
    pathname: PropTypes.string.isRequired
};
