import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './ChangePasswordModal.css';

const ChangePasswordModal = ({ show, handleClose, onSaveChanges, errorMessage }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSave, setpasswordSave] = useState(false);
  const [changeErrorMessage, setChangeErrorMessage] = useState('');
  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const resetTextFields = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setpasswordSave(false);
    setChangeErrorMessage('');
    setOldPasswordShown(false);
    setNewPasswordShown(false);
    setConfirmPasswordShown(false);
  };

  const saveAttempt = () => {
    setpasswordSave(true);

    if (!(oldPassword && newPassword && confirmPassword)) {
      setChangeErrorMessage('Please fill out all fields.');
      return;
    }

    if (newPassword.length < 5) {
      setChangeErrorMessage('Password must be at least 5 characters long');
      return;
    }

    if (!/\d/.test(newPassword) || !/[a-zA-Z]/.test(newPassword)) {
      setChangeErrorMessage('Password must contain at least one digit and one letter.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangeErrorMessage('New passwords do not match.');
      return;
    }

    onSaveChanges(oldPassword, newPassword);
    resetTextFields();
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

  useEffect(() => {
    setChangeErrorMessage(errorMessage);
  }, [errorMessage]);

  return (
    <Modal show={show} onHide={closeModal} className="change-password-modal">
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formOldPassword">
            <Form.Label>Old Password</Form.Label>
            <div className="input-with-icon">
              <Form.Control
                type={oldPasswordShown ? "text" : "password"}
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Button variant="light" className="password-toggle-btn" onClick={() => setOldPasswordShown(!oldPasswordShown)}>
                {oldPasswordShown ? <FiEye /> : <FiEyeOff />}
              </Button>
            </div>
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <div className="input-with-icon">
              <Form.Control
                type={newPasswordShown ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button variant="light" className="password-toggle-btn" onClick={() => setNewPasswordShown(!newPasswordShown)}>
                {newPasswordShown ? <FiEye /> : <FiEyeOff />}
              </Button>
            </div>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <div className="input-with-icon">
              <Form.Control
                type={confirmPasswordShown ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button variant="light" className="password-toggle-btn" onClick={() => setConfirmPasswordShown(!confirmPasswordShown)}>
                {confirmPasswordShown ? <FiEye /> : <FiEyeOff />}
              </Button>
            </div>
          </Form.Group>
        </Form>
        {changeErrorMessage && (
          <Alert variant="danger">{changeErrorMessage}</Alert>
        )}
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
