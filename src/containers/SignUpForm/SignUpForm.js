import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { black, blue500 } from 'material-ui/styles/colors';

const styles = {
    errorStyle: {
        color: black
    },
    floatingLabelStyle: {
        color: blue500
    }
};

const SignUpForm = ({ handleClose, dispatch, openModal }) => {
    return (
        <form onSubmit={this.handleSubmit}>
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
                        disabled
                        onTouchTap={() => dispatch(handleClose(false))}
                    />
                ]}
                modal
                open={openModal}
            >
            The email you provided is not registered. Would you like to use it
            to join and start sharing with everyone?
            <br />
                <TextField
                    hintText="Your Name"
                    errorText="This field is required"
                    errorStyle={styles.errorStyle}
                    floatingLabelText="Your Name"
                    floatingLabelFocusStyle={styles.floatingLabelStyle}
                /><br />
                <TextField
                    hintText="Tell Us About Yourself!"
                    errorText="This Field is Required"
                    errorStyle={styles.errorStyle}
                    floatingLabelText="Tell Us About Yourself!"
                    floatingLabelFocusStyle={styles.floatingLabelStyle}
                    multiline
                    rows={3}
                />
            </Dialog>
        </form>
    );
};

export default connect()(SignUpForm);
