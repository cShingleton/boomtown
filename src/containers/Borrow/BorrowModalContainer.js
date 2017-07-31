import React, { Component } from 'react';
import { connect } from 'react-redux';

import BorrowModal from './BorrowModal';
import { showBorrowModal } from '../../redux/modules/items';

class BorrowModalContainer extends Component {

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
