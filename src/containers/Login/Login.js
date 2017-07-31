import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import ValidatedTextField from '../../components/ValidatedTextField';

import './styles.css';
import logo from '../../images/boomtown-logo.svg';
import bottomLeft from '../../images/home-bl.svg';
import topRight from '../../images/home-tr.svg';

const Login = ({
        login,
        children,
        handleOpen,
        dispatch,
        capturePassword,
        captureEmail
    }) => (
        <div className="page login">
            <div className="logo">
                <img src={logo} alt="Boomtown Logo" />
            </div>
            <div className="topRight">
                <img src={topRight} alt="Sky" />
            </div>
            <div className="bottomLeft">
                <img src={bottomLeft} alt="City" />
            </div>
            <div className="cardContainer">
                <Paper zDepth={5}>
                    {children} {/* This renders the child modal */}
                    <div className="formContainer">
                        <form onSubmit={login} autoComplete="off">
                            <div>
                                <ValidatedTextField
                                    label="Email"
                                    type="input"
                                    onChangeAction={(e) => dispatch(captureEmail(e.target.value))}
                                />
                            </div>
                            <div>
                                <ValidatedTextField
                                    label="Password"
                                    type="password"
                                    onChangeAction={(e) => dispatch(capturePassword(e.target.value))}
                                />
                            </div>
                            <div style={{ margin: '12px 0', width: '100%', textAlign: 'center' }}>
                                <RaisedButton primary type="submit" style={{ marginRight: '12px' }}>
                                    Enter
                                </RaisedButton>
                                <FlatButton onTouchTap={() => dispatch(handleOpen(true))}>
                                    Sign Up
                                </FlatButton>
                            </div>
                        </form>
                    </div>
                </Paper>
            </div>
        </div>
);

Login.defaultProps = {
    children: null
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    children: PropTypes.element,
    handleOpen: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    capturePassword: PropTypes.func.isRequired,
    captureEmail: PropTypes.func.isRequired
};

export default connect()(Login);
