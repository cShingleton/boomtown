import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import ValidatedTextField from '../../components/ValidatedTextField';

const SignUpForm = ({
        handleClose,
        dispatch,
        openModal,
        signUp,
        captureTitle,
        captureDescription
    }) => (
        <form onSubmit={(e) => signUp(e)}>
            <Dialog
                title="No Account With This Email"
                actions={[
                    <FlatButton
                        label="No Thanks"
                        primary
                        onTouchTap={() => dispatch(handleClose(false))}
                    />,
                    <RaisedButton
                        label="Join!"
                        primary
                        onTouchTap={(e) => signUp(e)}
                    />
                ]}
                modal
                open={openModal}
            >
            The email you provided is not registered. Would you like to use it
            to join and start sharing with everyone?
            <br />
                <ValidatedTextField
                    label="Your Name"
                    type="input"
                    onChangeAction={(e) => dispatch(captureTitle(e.target.value))}
                /><br />
                <ValidatedTextField
                    label="Tell Us About Yourself!"
                    type="input"
                    onChangeAction={(e) => dispatch(captureDescription(e.target.value))}
                />
            </Dialog>
        </form>
);

export default connect()(SignUpForm);

SignUpForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    captureDescription: PropTypes.func.isRequired,
    captureTitle: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
};
