import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { IoPersonRemove, IoTrashOutline } from 'react-icons/io5';
import './Admin.css';
import ConfirmationModal from '../ConfirmationCard/ConfirmationModal';
import ConfirmationToast from '../ConfirmationCard/ConfirmationToast'; 

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
    const [modalDialog, setModalDialog] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);
    const [dialogMessage, setDialogMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const deleteItem = (itemId) => {
        setCurrentItemId(itemId);
        const detail = activeTab === 'users'
            ? reportedUsers.find(user => user.user_id === itemId)?.userId
            : reportedPosts.find(post => post.post_id === itemId)?.title;
        const message = activeTab === 'users'
            ? `Are you sure you want to ban the user "${detail}"?`
            : `Are you sure you want to delete the post "${detail}"?`;
        setDialogMessage(message);
        setModalDialog(true);
    };

    const handleDelete = () => {
        let itemName = '';
        if (activeTab === 'users') {
            const user = reportedUsers.find(user => user.user_id === currentItemId);
            if(user) {
                itemName = user.userId; 
            }
            setReportedUsers(prevUsers => prevUsers.filter(user => user.user_id !== currentItemId));
            setToastMessage(`User "${itemName}" has been banned.`); 
        } else {
            const post = reportedPosts.find(post => post.post_id === currentItemId);
            if(post) {
                itemName = post.title; 
            }
            setReportedPosts(prevPosts => prevPosts.filter(post => post.post_id !== currentItemId));
            setToastMessage(`Post "${itemName}" has been deleted.`); 
        }
        setShowToast(true);
        setModalDialog(false);
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
                                        <ListGroup.Item key={user.user_id} className="d-flex justify-content-between my-2 rounded-pill">
                                            <span className="reports">{user.reports}</span>
                                            <span className="userId">{user.userId}</span>
                                            <Button variant="link" className="remove-user-btn" onClick={() => deleteItem(user.user_id)} title="Ban user">
                                                <IoPersonRemove size="1.5em" className="remove-user-icon"/> 
                                            </Button>
                                        </ListGroup.Item>
                                    </div>
                                ))}
                            </ListGroup>
                        )}
                        {activeTab === 'posts' && (
                            <ListGroup>
                                {reportedPosts.map((post, index) => (
                                    <ListGroup.Item key={post.post_id} className="post-bar">
                                        <div className="post-info">
                                            <span className="report-count">{post.reports}</span>
                                            <span className="post-username">{post.username}</span>
                                            <span className="post-title">{post.title}</span>
                                        </div>
                                        <div className="post-actions">
                                            <Button variant="primary" size="sm" className="view-btn" title="View post">View</Button>
                                            <IoTrashOutline className="remove-post-icon" onClick={() => deleteItem(post.post_id)} title="Delete post"/>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </div>
                </Col>
            </Row>
            <ConfirmationModal
                show={modalDialog}
                onHide={() => setModalDialog(false)}
                onConfirm={handleDelete}
                message={dialogMessage}
            />
            <ConfirmationToast
                show={showToast}
                message={toastMessage}
                onClose={() => setShowToast(false)}
            />
        </Container>
    );
};

export default Admin;