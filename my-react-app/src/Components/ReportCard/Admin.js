import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { IoPersonRemove, IoTrashOutline } from 'react-icons/io5';
import './Admin.css';

const Admin = () => {
    const [reportedUsers, setReportedUsers] = useState([
        { user_id: 1, userId: '@farmerjoe', reports: '1.6k reports'},
        { user_id: 2, userId: '@riotGoose', reports: '1.4k reports'},
        { user_id: 3, userId: '@tomglue83', reports: '743 reports' },
        { user_id: 4, userId: '@trollot', reports: '425 reports'}
    ]);

    const [reportedPosts, setReportedPosts] = useState([
        { post_id: 1, username: '@farmerjoe', title: 'Night Song', reports: '3.3k reports' },
        { post_id: 2, username: '@riotGoose', title: 'I h8 my cat', reports: '1.2k reports' },
        { post_id: 3, username: '@drRubrik', title: 'My Wife Left Me', reports: '989 reports' },
        { post_id: 4, username: '@meadowspring42', title: 'Hi Guys!', reports: '735 reports' },
    ]);

    const [activeTab, setActiveTab] = useState('users');

    const removeUser = (userId) => {
        setReportedUsers(reportedUsers.filter(user => user.user_id !== userId));
    };

    const removePost = (postId) => {
        setReportedPosts(reportedPosts.filter(post => post.post_id !== postId));
    };

    return (
        <Container className="mid">
            <Row className="justify-content-md-center">
                <Col xs={12} sm={12} md={10} lg={8}>
                    <div className="tabs">
                        <span 
                            className={`tab ${activeTab === 'users' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('users')}
                        >
                            Reported Users
                        </span>
                        <span 
                            className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
                            onClick={() => setActiveTab('posts')}
                        >
                            Reported Posts
                        </span>
                    </div>
                    <div className="content-area">
                        {activeTab === 'users' && (
                            <ListGroup>
                                {reportedUsers.map((user, index) => (
                                    <div key={index} className="user-item">
                                        <ListGroup.Item key ={user.user_id} className="d-flex justify-content-between my-2 rounded-pill">
                                            <span className="reports">{user.reports}</span>
                                            <span className="userId">{user.userId}</span>
                                            <Button variant="link" className="remove-user-btn" onClick={() => removeUser(user.user_id)}>
                                            <IoPersonRemove size="1.5em" className="remove-user-icon"/>
                                            </Button>
                                        </ListGroup.Item>
                                    </div>
                                ))}
                            </ListGroup>
                        )}
                        {activeTab === 'posts' && (
                            <ListGroup>
                                {reportedPosts.map((post) => (
                                    <ListGroup.Item key={post.post_id} className="post-bar">
                                        <div className="post-info">
                                            <span className="report-count">{post.reports}</span>
                                            <span className="post-username">{post.username}</span>
                                            <span className="post-title">{post.title}</span>
                                        </div>
                                        <div className="post-actions">
                                            <Button variant="primary" size="sm" className="view-btn">View</Button>
                                            <IoTrashOutline className="remove-post-icon" onClick={() => removePost(post.post_id)} />
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;
