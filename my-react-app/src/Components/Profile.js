import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import ContentCard from "./ContentCard/ContentCard";
import './../index.css';
import './MainPage/MainPage.css';
import ConfirmationModal from './ConfirmationCard/ConfirmationModal';
import ChangePasswordModal from './ConfirmationCard/ChangePasswordModal';
import ConfirmationToast from './ConfirmationCard/ConfirmationToast';
import postData from "../demoData/posts.json"
import { useNavigate } from 'react-router-dom';
import UserController from "../Controllers/UserController";
import { useSession } from "./SessionContext";

const Profile = () => {
  const [posts, setPosts] = useState(postData);
  const { userId } = useSession();
  const navigate = useNavigate();
  const usersPosts = posts.filter(post => post.user_id === '@elistjames');
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showPasswordChangedToast, passwordChangedToast] = useState(false);
  const handlePasswordModal = () => addPasswordModal(true);
  const [changePasswordModal, addPasswordModal] = useState(false);
  const closePasswordModal = () => addPasswordModal(false);
  const passwordChange = () => {
    passwordChangedToast(true);
    closePasswordModal();
  };

  const handleConfirmDelete = async () => {
    try {
      UserController.deleteAccount(userId).then(navigate('/register'));
    } catch (error) {
      console.error('Account deletion failed:', error);
    }
  }

  return (
    <>
      <Card className="form-card rounded-custom">
        <Card.Body>
          <div className="mb-3">
            <div className="static-field mb-3">
              <Card.Title className="text-muted">Username</Card.Title>
              <Card.Text className="static-value">@elistjames</Card.Text>
            </div>
            <div className="d-flex justify-content-around mb-3">
              <Button variant="primary" className="change-password-btn rounded-button" onClick={handlePasswordModal}>
                Change Password
              </Button>
              <Button variant="danger" onClick={handleShowModal}>
                Delete Account
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <h2 className="posts-heading text-center">Your Posted Content</h2>
      <div className="posts">
        {usersPosts.map(post => (
          <ContentCard key={post.post_id} post={post} username="@elistjames" />
        ))}
      </div>
      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete your account?"
      />
      <ChangePasswordModal
        show={changePasswordModal}
        handleClose={closePasswordModal}
        onSaveChanges={passwordChange}
      />
      <ConfirmationToast
        show={showPasswordChangedToast}
        message="Password changed successfully."
        onClose={() => passwordChangedToast(false)}
      />
    </>
  );
};

export default Profile;
