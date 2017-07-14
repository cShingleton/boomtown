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
                        multiple={true}
                        floatingLabelText="Filter By Tag"
                    >
                        <MenuItem value={1} primaryText="Electronics" />
                        <MenuItem value={2} primaryText="Household Items" />
                        <MenuItem value={3} primaryText="Musical Instruments" />
                        <MenuItem value={4} primaryText="Physical Media" />
                        <MenuItem value={5} primaryText="Recreational Equipment" />
                        <MenuItem value={6} primaryText="Sporting Goods" />
                        <MenuItem value={7} primaryText="Tools" />
                    </SelectField>
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
