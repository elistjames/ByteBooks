import React from 'react';
import "./../index.css";
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ContentCard from "./ContentCard/ContentCard";

const Profile = ({ posts }) => {
  const usersPosts = posts.filter(post => post.user_id === '@elistjames');

  return (
    <>

      <Card className="form-card ">
        <Card.Body>
          <div className="mb-3">
            <div className="static-field">
              <Card.Title className="text-muted">Username</Card.Title>

              <Card.Text className="static-value">@elistjames</Card.Text>
            </div>
            <div className="static-field">
              <Card.Title className="text-muted">Email</Card.Title>

              <Card.Text className="static-value">elistjames@gmail.com</Card.Text>
            </div>
          </div>
          <Button variant="danger" className="mx-auto d-block">
            Delete Account
          </Button>
        </Card.Body>
      </Card>
      <h2 className="posts-heading text-center mt-4">Your Posted Content</h2>
      <div className="user-posts">
        {usersPosts.map(post => (
          <ContentCard key={post.post_id} post={post} username="@elistjames" />
        ))}
      </div>
    </>
  );
};

export default Profile;
