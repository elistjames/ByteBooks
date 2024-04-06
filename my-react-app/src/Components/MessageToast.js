import React from 'react';
import { Toast } from 'react-bootstrap';
import '../index.css';
const MessageToast = ({ show, message, onClose }) => {
    return (
        <Toast as="div" onClose={onClose} show={show} delay={2000} autohide className="bg-danger message-toast">
            <Toast.Body style={{color: "white", fontSize: "15px"}}>{message}</Toast.Body>
        </Toast>
    );
};

export default MessageToast;