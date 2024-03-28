import React from 'react';
import { Toast } from 'react-bootstrap';

const ConfirmationToast = ({ show, message, onClose }) => {
    return (
        <Toast onClose={onClose} show={show} delay={3000} autohide
            style={{
                position: 'fixed',
                top: 50, 
                right: 15,
                zIndex: 100,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: '16px'
            }}>
            <Toast.Header closeButton={true} style={{ borderRadius: '16px 16px 0 0', backgroundColor: 'transparent' }}>
                <div style={{ display: 'inline-flex', width: '100%', justifyContent: 'space-between' }}>
                    <strong>Confirmation</strong>
                </div>
            </Toast.Header>
            <Toast.Body style={{ borderRadius: '0 0 16px 16px' }}>{message}</Toast.Body>
        </Toast>
    );
};

export default ConfirmationToast;
