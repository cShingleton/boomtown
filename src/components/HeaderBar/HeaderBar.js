import React from 'react';
import { connect } from 'react-redux';
import { AppBar, RaisedButton } from 'material-ui';
import PropTypes from 'prop-types';
import logo from '../../images/boomtown-logo.svg';
import FilterField from '../../containers/FilterField';
import { updateItemsFilter } from '../../redux/modules/items';
import './styles.css';

const HeaderBar = ({ itemFilters, pathname }) => (
    <AppBar
        showMenuIconButton={false}
        className={'headerbar'}
        title={
            <div className="title-wrapper">
                <a href="/"><img className="headerbar-logo" src={logo} alt="boomtown logo" /></a>
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
                <RaisedButton className="headerbar-btns" primary label="My Profile" />
                <RaisedButton className="headerbar-btns" secondary label="Log Out" />
            </div>
        </div>
    </AppBar>
);

const mapStateFromProps = (state) => ({
    itemFilters: state.items.itemFilters,
    pathname: state.router.location.pathname
});

export default connect(mapStateFromProps)(HeaderBar);

HeaderBar.propTypes = {
    itemFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
    pathname: PropTypes.string.isRequired
};
