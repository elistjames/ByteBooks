import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import ContentCard from "./ContentCard/ContentCard";
import './../index.css';
import './MainPage/MainPage.css';
import ConfirmationModal from './ConfirmationCard/ConfirmationModal'; 

const Profile = ({ posts = [] }) => {
  const usersPosts = posts.filter(post => post.user_id === '@elistjames');

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleConfirmDelete = () => {handleCloseModal();
  };

  return (
    <>
      <Card className="form-card rounded-custom">
        <Card.Body>
          <div className="mb-3">
            <div className="static-field mb-3">
              <Card.Title className="text-muted">Username</Card.Title>
              <Card.Text className="static-value">@elistjames</Card.Text>
            </div>
              <Button variant="danger" className="mx-auto d-flex justify-content-around mb-3" onClick={handleShowModal}>
                Delete Account
              </Button>
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
    </>
  );
};

export default Profile;
