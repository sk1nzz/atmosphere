import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { dismissModal } from '../Store/Actions/Actions';

function ModalController(props) {
    if (props.modal) {
        return (
            <div className='modal-container'>
                <div className='modal-wrapper blur-card'>
                    <div className={classNames('modal-header', 'modal-type-' + props.modal.modalType)}>
                        {props.modal.modalTitle}
                    </div>
                    <div className='modal-body'>
                        {props.modal.modalBody}
                    </div>
                    <button className='modal-btn ui-button button-blue' onClick={() => props.dismissModal()}>OK</button>
                </div>
            </div>
        );
    }
    return null;
}

export default connect(
    state => ({
        modal: state.modal
    }), { dismissModal }
)(ModalController);