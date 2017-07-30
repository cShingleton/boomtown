import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import HeaderBar from '../HeaderBar';
import Footer from '../Footer';
import './styles.css';

const Layout = ({ children, pathname }) => (
    <div className="appContentWrapper">
        <div className="appHeader">
            {(pathname === '/login' || pathname === '/login/') ?
                 null : <HeaderBar />
            }
        </div>
        <div className="appContent">
            {children}
            <Link to={'/share'}>
                <FloatingActionButton className="shareButton" secondary>
                    <ContentAdd />
                </FloatingActionButton>
            </Link>
        </div>
        <footer className="appFooter">
        {(pathname === '/login' || pathname === '/login/') ?
                 null : <Footer />
            }
        </footer>
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
