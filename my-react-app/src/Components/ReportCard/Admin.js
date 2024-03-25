import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import {IoPersonRemove } from 'react-icons/io5';
import './Admin.css'; 

const Admin = () => {
    const [reportedUsers, setReportedUsers] = useState([
        { id: 1, userId: '@farmerjoe', reports: '1.6k reports'},
        { id: 2, userId: '@riotGoose', reports: '1.4k reports'},
        { id: 3, userId: '@tomglue83', reports: '743 reports' },
        { id: 4, userId: '@trollot', reports: '425 reports'}
    ]);

    const [activeTab, setActiveTab] = useState('users');

    const removeUser = (userId) => {
        setReportedUsers(reportedUsers.filter(user => user.id !== userId));
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
                                        <ListGroup.Item className="d-flex justify-content-between my-2 rounded-pill">
                                            <span className="reports">{user.reports}</span>
                                            <span className="username">{user.userId}</span>
                                            <Button variant="link" className="remove-user-btn" onClick={() => removeUser(user.id)}>
                                            <IoPersonRemove size="1.5em" className="icon-shadow"/>
                                            </Button>
                                        </ListGroup.Item>
                                    </div>
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
