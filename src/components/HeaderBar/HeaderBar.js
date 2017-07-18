import React from 'react';
import { connect } from 'react-redux';
import { AppBar, RaisedButton } from 'material-ui';
import logo from '../../images/boomtown-logo.svg';
import FilterField from '../../containers/FilterField';
import { updateItemsFilter } from '../../redux/modules/items';
import './styles.css';

const HeaderBar = ({ itemFilters }) => (
    <AppBar
        showMenuIconButton={false}
        className={'headerbar'}
        title={
            <div className="title-wrapper">
                <a href="/"><img className="headerbar-logo" src={logo} alt="boomtown logo" /></a>
                <div className="header-filter">
                    {(window.location.pathname === '/') ?
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
                <RaisedButton className="headerbar-btns" primary={true} label="My Profile" />
                <RaisedButton className="headerbar-btns" secondary={true} label="Log Out" />
            </div>
        </div>
    </AppBar>
);

const mapStateFromProps = state => ({
    itemFilters: state.items.itemFilters
});

export default connect(mapStateFromProps)(HeaderBar);
