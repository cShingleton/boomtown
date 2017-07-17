import React from 'react';
import { AppBar, RaisedButton } from 'material-ui';
import logo from '../../images/boomtown-logo.svg';
import FilterField from '../../containers/FilterField/';
import './styles.css';

const HeaderBar = () => (
    <AppBar
        showMenuIconButton={false}
        className={'headerbar'}
        title={
            <div className="title-wrapper">
                <a href="/"><img className="headerbar-logo" src={logo} alt="boomtown logo" /></a>
                <div className="header-filter">
                    {(window.location.pathname === '/') ?
                        <FilterField /> : null
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

export default HeaderBar;
