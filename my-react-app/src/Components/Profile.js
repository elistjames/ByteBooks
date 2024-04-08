import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import ContentCard from "./ContentCard/ContentCard";
import ConfirmationModal from './ConfirmationCard/ConfirmationModal';
import ChangePasswordModal from './ConfirmationCard/ChangePasswordModal';
import ConfirmationToast from './ConfirmationCard/ConfirmationToast';
import UserController from "../Controllers/UserController";
import { useSession } from "./SessionContext";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, username, setUserRoleType, setUser, setId } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [changeErrorMessage, setChangeErrorMessage] = useState('');
  const [showPasswordChangedToast, setShowPasswordChangedToast] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [passwordChangedMessage, setPasswordChangedMessage] = useState('');

  useEffect(() => {
    if (username) {
      UserController.getUserPosts(username)
        .then(posts => {
          setUserPosts(posts);
        })
        .catch(error => console.error("Error fetching user posts:", error));
    }
  }, [username]);

  const handleConfirmDelete = async () => {
    try {
      await UserController.deleteAccount(userId);
      setUserRoleType('guest');
      setUser('');
      setId('');
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

const passwordChange = async (oldPassword, newPassword) => {
    try {
        const response = await UserController.changePassword(userId, oldPassword, newPassword);
        if (response.success) {
            setShowPasswordChangedToast(true);
            setPasswordChangedMessage(response.message);
            setChangePasswordModal(false);
            setChangeErrorMessage('');
        } else {
            setChangeErrorMessage(response.message);
        }
    } catch (error) {
        setChangeErrorMessage(error.message);
    }
};


  return (
    <>
      <Card className="form-card rounded-custom">
        <Card.Body>
          <div className="mb-3">
            <div className="static-field mb-3">
              <Card.Title className="text-muted">Username</Card.Title>
              <Card.Text className="static-value">{username}</Card.Text>
            </div>
            <div className="d-flex justify-content-around mb-3">
              <Button variant="primary" className="change-password-btn rounded-button" onClick={() => setChangePasswordModal(true)}>
                Change Password
              </Button>
              <Button variant="danger" onClick={() => setShowModal(true)}>
                Delete Account
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <h2 className="posts-heading text-center">Your Posted Content</h2>
      <div className="posts">
        {userPosts.map(post => (
          <ContentCard key={post.post_id} post={post} username={username} />
        ))}
      </div>
      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete your account?"
      />
      <ChangePasswordModal
        show={changePasswordModal}
        handleClose={() => setChangePasswordModal(false)}
        onSaveChanges={passwordChange}
        errorMessage={changeErrorMessage}
      />
      <ConfirmationToast
        show={showPasswordChangedToast}
        message={passwordChangedMessage}
        onClose={() => setShowPasswordChangedToast(false)}
      />
    </>
  );
};

export default Profile;
