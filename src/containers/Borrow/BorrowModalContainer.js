import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BorrowModal from './BorrowModal';
import { showBorrowModal } from '../../redux/modules/items';

class BorrowModalContainer extends Component {

    // ADD LOGIC HERE

    render() {
        return (
            <BorrowModal
                openModal={this.props.showBorrowModal}
                closeModal={showBorrowModal}
            />
        );
    }
}

const mapStateToProps = state => ({
    showBorrowModal: state.items.borrowModalDisplayed
});

export default connect(mapStateToProps)(BorrowModalContainer);

BorrowModalContainer.propTypes = {
    showBorrowModal: PropTypes.bool.isRequired
};
