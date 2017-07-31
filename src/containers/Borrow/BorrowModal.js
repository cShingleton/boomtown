import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const BorrowModal = ({ openModal, closeModal, dispatch }) => (
    <Dialog
        title="Borrow Item"
        modal
        open={openModal}
        actions={[
            <FlatButton
                label="No Thanks"
                primary
                onTouchTap={() => dispatch(closeModal(false))}
            />,
            <RaisedButton
                label="Join!"
                primary
                disabled
                onTouchTap={() => dispatch(closeModal(false))}
            />
        ]}
    >
        Would you like to request to borrow this item?
        <br />
    </Dialog>
);

export default connect()(BorrowModal);

BorrowModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
};
