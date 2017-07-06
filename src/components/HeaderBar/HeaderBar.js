import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, RaisedButton, SelectField } from 'material-ui';
import logo from '../../images/boomtown-logo.svg';
import './styles.css';
import {
  lightBlue200,
  blueGrey900,
  white
} from 'material-ui/styles/colors';

const styles = {
    profileStyle: {
        color: blueGrey900
    },
    backgroundStyle: {
        background: white
    }
};

const HeaderBar = () => {
    return (
            <AppBar 
                style={styles.backgroundStyle} 
                showMenuIconButton={false} 
                className={'headerbar'}
                title={
                    <div className="title-wrapper">
                        <a href="/"><img className="headerbar-logo" src={logo} alt="boomtown logo" /></a>
                        <div className="header-filter">
                            <SelectField
                                floatingLabelText="Filter By Tag"
                            >
                            {} {/* <== menuitems go here */}
                            </SelectField>
                        </div>
                    </div>}
            >
                <div>
                    <div className="headerbuttonwrapper"> 
                        <RaisedButton className="headerbar-btns" label="My Profile" style={styles.profileStyle} />
                        <RaisedButton className="headerbar-btns" label="Log Out" style={styles} />
                    </div>
                </div>
            </AppBar>
    );
}

export default HeaderBar;
