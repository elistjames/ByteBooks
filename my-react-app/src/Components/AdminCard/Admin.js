import React, {useEffect, useState} from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { IoPersonRemove, IoTrashOutline } from 'react-icons/io5';
import './Admin.css';
import ConfirmationModal from '../ConfirmationCard/ConfirmationModal';
import ConfirmationToast from '../ConfirmationCard/ConfirmationToast';
import ReportController from "../../Controllers/ReportController";
import { v4 as uuidv4 } from 'uuid';
import MainPageController from "../../Controllers/MainPageController";
import UserController from "../../Controllers/UserController";

const Admin = () => {
    const [reportedUsers, setReportedUsers] = useState([]);

    const [reportedPosts, setReportedPosts] = useState([]);

    const [activeTab, setActiveTab] = useState('users');
    const [modalDialog, setModalDialog] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [dialogMessage, setDialogMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        ReportController.getAllReports().then((data) => {
            setReportedPosts(data.filter(report => report.reported_user_id === null));
            setReportedUsers(data.filter(report => report.post_id === null));
        })
    }, []);

    const deletePost = (post) => {
        setCurrentPostId(post.post_id);
        setDialogMessage(`Are you sure you want to delete the post "${post.title}"?`);
        setModalDialog(true);
    };


    const deleteUser = (user) => {
        setCurrentUserId(user.reported_user_id);
        setDialogMessage(`Are you sure you want to ban the user "${user.username}"?`);
        setModalDialog(true);
    };

    const handleDelete = () => {
        let itemName = '';
        setModalDialog(false);
        if (activeTab === 'users') {
            const user = reportedUsers.find(user => user.reported_user_id === currentUserId);
            if(user) {
                UserController.deleteAccount(user.reported_user_id).then((response) => {
                    const index = reportedUsers.indexOf(user);
                    if(index < 0) {
                        return;
                    }
                    setReportedUsers((prev) => {
                        const cloneUsers = [...prev];
                        cloneUsers.splice(index, 1);
                        return cloneUsers;}
                    );
                    setToastMessage(`User has been banned.`);
                    setShowToast(true);
                }).catch((error) => {
                    console.log(error);
                });
            }
        } else {
            const post = reportedPosts.find(post => post.post_id === currentPostId);
            if(post) {
                MainPageController.deletePost(post.post_id).then((response) => {
                    const index = reportedPosts.indexOf(post);
                    if(index < 0) {
                        return;
                    }
                    setReportedPosts((prev) => {
                        const clonePosts = [...prev];
                        clonePosts.splice(index, 1);
                        return clonePosts;}
                    );
                    setToastMessage(`Post "${post.title}" has been deleted.`);
                    setShowToast(true);
                }).catch((error) =>{
                    console.log(error);
                });
            }
        }
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
                                {reportedUsers.map((user) => (
                                    <div key={uuidv4()} className="user-item">
                                        <ListGroup.Item className="d-flex justify-content-between my-2 rounded-pill">
                                            <span className="reports">{user.report_count}</span>
                                            <span className="userId">@{user.username}</span>
                                            <Button variant="link" className="remove-user-btn" onClick={() => deleteUser(user)} title="Ban user">
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
                                    <ListGroup.Item key={uuidv4()} className="post-bar">
                                        <div className="post-info">
                                            <span className="report-count">{post.report_count}</span>
                                            <span className="post-username">{post.username}</span>
                                            <span className="post-title">{post.title}</span>
                                        </div>
                                        <div className="post-actions">
                                            <Button variant="primary" size="sm" className="view-btn" title="View post">View</Button>
                                            <IoTrashOutline className="remove-post-icon" onClick={() => deletePost(post)} title="Delete post"/>
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