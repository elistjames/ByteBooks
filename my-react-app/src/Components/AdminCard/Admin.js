import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { IoPersonRemove, IoTrashOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'; 
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

    const navigate = useNavigate(); 

    useEffect(() => {
        ReportController.getAllReports().then((data) => {
            const combineReports = (data, key) => {
                const map = new Map();
                data.forEach(report => {
                    if (!report[key]) return;
                    const currentReport = map.get(report[key]);
                    if (currentReport) {
                        map.set(report[key], { ...report, report_count: currentReport.report_count + 1 });
                    } else {
                        map.set(report[key], { ...report, report_count: 1 });
                    }
                });
                return Array.from(map.values()); 
            };
            const combinedPosts = combineReports(data.filter(report => report.reported_user_id === null), 'post_id');
            const combinedUsers = combineReports(data.filter(report => report.post_id === null), 'reported_user_id');
    
            setReportedPosts(combinedPosts);
            setReportedUsers(combinedUsers);
        });
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
                    setToastMessage(`User "${user.username}" has been banned.`);
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

    const viewPost = (postId) => {
        navigate(`/viewpost/${postId}`); 
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
                                            <div className="report-count-container">
                                                <div className="report-count">{post.report_count}</div>
                                            </div>
                                            <div className="post-details">
                                                <div className="post-title">{post.title}</div>
                                                <div className="view-reported-post-container">
                                                    <Button size="sm" className="btn-primary view-btn"
                                                            title="View post"
                                                            onClick={() => viewPost(post.post_id)}>View</Button>
                                                </div>
                                            </div>
                                            <div className="post-actions">
                                                <IoTrashOutline className="remove-post-icon"
                                                                onClick={() => deletePost(post)} title="Delete post"/>
                                            </div>
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