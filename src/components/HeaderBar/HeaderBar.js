import React from 'react';
import { AppBar, RaisedButton, SelectField, MenuItem } from 'material-ui';
import logo from '../../images/boomtown-logo.svg';
import './styles.css';

const HeaderBar = () => (
    <AppBar
        showMenuIconButton={false}
        className={'headerbar'}
        title={
            <div className="title-wrapper">
                <a href="/"><img className="headerbar-logo" src={logo} alt="boomtown logo" /></a>
                <div className="header-filter">
                    <SelectField
                        floatingLabelText="Filter By Tag"
                    >
                        <MenuItem value={1} primaryText="Never Works" />
                    </SelectField>
                </div>
            </div>
        }
    >
        <div>
            <div className="headerbuttonwrapper">
                <RaisedButton className="headerbar-btns" label="My Profile" />
                <RaisedButton className="headerbar-btns" label="Log Out" />
            </div>
        </div>
    </AppBar>
);

export default HeaderBar;
