import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import './ChangePasswordModal.css';

const ChangePasswordModal = ({ show, handleClose, onSaveChanges }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSave, setpasswordSave] = useState(false);
  const allFilled = oldPassword && newPassword && confirmPassword;

  const resetTextFields = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setpasswordSave(false);
  };
  const saveAttempt = () => {
    setpasswordSave(true);
    if (allFilled) {
      onSaveChanges();
      resetTextFields();
    }
  };
  const closeModal = () => {
    handleClose();
    resetTextFields();
  };
  useEffect(() => {
    if (!show) {
      resetTextFields();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={closeModal} className="change-password-modal">
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {passwordSave && !allFilled && ( <Alert variant="danger">
              All fields must be filled.
            </Alert>
          )}
          <Form.Group controlId="formOldPassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control type="password" placeholder="Enter old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" className="rounded-btn" onClick={closeModal}>
          Close
        </Button>
        <Button
          variant="primary"
          className="rounded-btn"
          onClick={saveAttempt}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
