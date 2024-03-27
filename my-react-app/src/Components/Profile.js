import React from 'react';
import "./../index.css";
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ContentCard from "./ContentCard/ContentCard";
import './MainPage/MainPage.css';

const Profile = ({ posts = [] }) => {
  const usersPosts = posts.filter(post => post.user_id === '@elistjames');

  return (
    <>

      <Card className="form-card rounded-custom">
        <Card.Body>
          <div className="mb-3">
            <div className="static-field mb-3">
              <Card.Title className="text-muted">Username</Card.Title>

              <Card.Text className="static-value">@elistjames</Card.Text>
            </div>
            <div className="static-field mb-3">
              <Card.Title className="text-muted">Email</Card.Title>

              <Card.Text className="static-value">elistjames@gmail.com</Card.Text>
            </div>
          </div>
          <Button variant="danger" className="mx-auto d-block">
            Delete Account
          </Button>
        </Card.Body>
      </Card>
      <h2 className="posts-heading text-center ">Your Posted Content</h2>
      <div className="posts">
        {usersPosts.map(post => (
          <ContentCard key={post.post_id} post={post} username="@elistjames" />
        ))}
      </div>
    </>
  );
};

export default Profile;
