import React from 'react';
import { Toast } from 'react-bootstrap';
import './ConfirmationToast.css'; 

const ConfirmationToast = ({ show, message, onClose }) => {
    return (
        <Toast onClose={onClose} show={show} delay={3000} autohide className="confirmation-toast">
            <Toast.Header closeButton={true} className="toast-header">
                <div className="header-content">
                    <strong>Confirmation</strong>
                </div>
            </Toast.Header>
            <Toast.Body className="toast-body">{message}</Toast.Body>
        </Toast>
    );
};

export default ConfirmationToast;
