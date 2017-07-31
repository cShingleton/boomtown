import React from 'react';
import { connect } from 'react-redux';
import { AppBar, RaisedButton } from 'material-ui';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FireBaseAuth } from '../../config/firebase';
import logo from '../../images/boomtown-logo.svg';
import FilterField from '../../containers/FilterField';
import { updateItemsFilter } from '../../redux/modules/items';
import './styles.css';

const HeaderBar = ({ itemFilters, pathname, userProfile }) => (
    <AppBar
        showMenuIconButton={false}
        className={'headerbar'}
        title={
            <div className="title-wrapper">
                <Link to={'/'}>
                    <img className="headerbar-logo" src={logo} alt="boomtown logo" />
                </Link>
                <div className="header-filter">
                    {(pathname === '/') ?
                        <FilterField
                            selectValues={itemFilters}
                            onChangeAction={updateItemsFilter}
                        /> : null
                    }
                </div>
            </div>
        }
    >
        <div>
            <div className="headerbuttonwrapper">
                <Link to={`/profile/${userProfile}`}>
                    <RaisedButton
                        className="headerbar-btns"
                        primary
                        label="My Profile"
                    />
                </Link>
                <RaisedButton
                    className="headerbar-btns"
                    secondary
                    label="Log Out"
                    onTouchTap={() => FireBaseAuth.signOut()}
                />
            </div>
        </div>
    </AppBar>
);

const mapStateFromProps = (state) => ({
    itemFilters: state.items.itemFilters,
    pathname: state.router.location.pathname,
    userProfile: state.auth.userProfile
});

export default connect(mapStateFromProps)(HeaderBar);

HeaderBar.propTypes = {
    itemFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
    pathname: PropTypes.string.isRequired,
    userProfile: PropTypes.string.isRequired
};
