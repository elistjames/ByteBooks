import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ConfirmationModal.css';

const ConfirmationModal = ({ show, onHide, onConfirm, message }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="light" className="btn-custom-light" onClick={onHide}>Cancel</Button>
                <Button variant="danger" className="btn-custom-danger" onClick={onConfirm}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
