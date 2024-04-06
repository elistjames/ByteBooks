import React, {useEffect, useState} from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { IoPersonRemove, IoTrashOutline } from 'react-icons/io5';
import './Admin.css';
import ConfirmationModal from '../ConfirmationCard/ConfirmationModal';
import ConfirmationToast from '../ConfirmationCard/ConfirmationToast';
import ReportController from "../../Controllers/ReportController";
import { v4 as uuidv4 } from 'uuid';

const Admin = () => {
    const [reportedUsers, setReportedUsers] = useState([]);

    const [reportedPosts, setReportedPosts] = useState([]);

    const [activeTab, setActiveTab] = useState('users');
    const [modalDialog, setModalDialog] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);
    const [dialogMessage, setDialogMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        ReportController.getAllReports().then((data) => {
            setReportedPosts(data.filter(report => report.reported_user_id === null));
            setReportedUsers(data.filter(report => report.post_id === null));
        })
    }, []);

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
                                {reportedUsers.map((user) => (
                                    <div key={uuidv4()} className="user-item">
                                        <ListGroup.Item className="d-flex justify-content-between my-2 rounded-pill">
                                            <span className="reports">{user.report_count}</span>
                                            <span className="userId">@{user.username}</span>
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
                                {reportedPosts.map((post) => (
                                    <ListGroup.Item key={uuidv4()} className="post-bar">
                                        <div className="post-info">
                                            <span className="report-count">{post.report_count}</span>
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