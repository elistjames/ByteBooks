<<<<<<< f8ee9418beb4b127d1a7e5d92961d192e7d962a8
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
      <h2 className="posts-heading text-center ">Your Posted Content</h2>
      <div className="main-page-body">
        {usersPosts.map(post => (
          <ContentCard key={post.post_id} post={post} username="@elistjames" />
        ))}
      </div>
    </>
=======
import React, {useState} from 'react';
import Comment from './Comment/Comment';

const Profile = () => {

    return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome to the Profile page!</p>
    </div>

>>>>>>> 1d6ae4ff26d4d6f932224ced0bf1cdaab817c748
  );
};

export default Profile;
