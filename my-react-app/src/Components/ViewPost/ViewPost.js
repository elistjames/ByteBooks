import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import CardContent from '@mui/material/CardContent';
import Button from 'react-bootstrap/Button';
import {Dropdown, DropdownButton} from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
import {getPost} from '../../demoApi';
import Comment from '../Comment/Comment';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from "./../SessionContext";
import { Link } from 'react-router-dom';
import ExpandableText from "./ExpandableText";
import { format } from 'date-fns';
import "./ViewPost.css"
import {useParams} from "react-router-dom";
import CommentController from "../../Controllers/CommentController";
import MainPageController from "../../Controllers/MainPageController";
import ReportController from "../../Controllers/ReportController";
import LikesController from "../../Controllers/LikesController";
import MessageToast from "../MessageToast";
import {BsHandThumbsDown, BsHandThumbsDownFill, BsHandThumbsUp, BsHandThumbsUpFill} from "react-icons/bs";

const displayTest = (limit) => {
    let text = "";
    let i = 0;
    for (; i < limit; i++ ) {
        text += "a";
    }
    return text;
}

const ViewPost = () => {
    const { id } = useParams();
    const { userType, username, userId } = useSession();
    const [postHeight, setPostHeight] = useState(0);

    const [comments, setComments] = useState([]);
    const [post, setPost] = useState(null);
    const [notOverLimit, setNotOverLimit] = useState(true);
    const [likedByUser, setLikedByUser] = useState(false);
    const [dislikedByUser, setDislikedByUser] = useState(false);
    const [numLikes, setNumLikes] = useState(0);
    const [numDislikes, setNumDislikes] = useState(0);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        MainPageController.getPostById(id, userId)
            .then((postData) => {
                setPost(postData);
                setNumLikes(postData.num_likes);
                setNumDislikes(postData.num_dislikes);
                setLikedByUser(postData.liked_by_user);
                setDislikedByUser(postData.disliked_by_user);
                isOwner();
                CommentController.getCommentsForPost(id).then((data) => {
                    setComments(data);
                }).catch((error) => {
                    handleError(error);
                });
            })
            .catch((error) => {
                handleError(error);
            });

    }, [id, userId]);

    const handleOnSubmit =(com)=>{
        if(post === null) return;
        if(com != null){
            CommentController.createComment(post.post_id, userId, username, com).then((commentId) => {
                const newComment = {
                    post_id: commentId,
                    user_id: userId,
                    username: username,
                    content: com
                };
                setComments((prev) => {
                    const cloneComments = [...prev];
                    cloneComments.unshift(newComment);
                    return cloneComments;
                });
            }).catch((error) => {
                handleError(error);
            })
        }
    };

    const SECONDARY_CHARACTER_LIMIT = 450;

    let isMobile = useMediaQuery({
        query: '(max-width: 767px)'
    });

    useEffect(() => {
        // Update post height when expanded state changes
        const postContainer = document.querySelector(".view-post-container");
        if (postContainer) {
            setPostHeight(postContainer.offsetHeight);
        }

        if ((post === null ? "" : post.content).length > SECONDARY_CHARACTER_LIMIT && isMobile) {
            setNotOverLimit(false);
        }
    }, [post]);
    const transformValue = `translate(-50%, calc(50% + ${postHeight}px))`;

    const handleReport = (reportPostMode) => {
        if(reportPostMode){
            ReportController.reportPost(post.post_id, userId, username, "It's offensive").then((response) =>{
                handleError("This post has been reported");
            }).catch((err) => {
                handleError(err.message);
            });
        }
        else{
            ReportController.reportUser(post.user_id, userId, username, "It's offensive").then((response) =>{
                handleError(`User @${post.username} has been reported`);
            }).catch((err) => {
                handleError(err.message);
            });
        }
    };

    const likeClicked = ()=> {
        if(userId === "") return;
        //if post is likes, remove like
        if(likedByUser){
            LikesController.removeLike(post.post_id, likedByUser, dislikedByUser, userId)
                .then(()=>{
                    setNumLikes(numLikes - 1);
                    setLikedByUser(false);
                })
                .catch();
        }
        else{
            LikesController.addLike(post.post_id, likedByUser, dislikedByUser, userId).then(() => {
                setNumLikes(numLikes + 1);
                setLikedByUser(true);
                if(dislikedByUser){
                    setNumDislikes(numDislikes-1);
                    setDislikedByUser(false);
                }
            });
        }
    };

    const dislikeClicked = () => {
        if(userId === "") return;
        //if post is disliked, remove dislike
        if(dislikedByUser){
            LikesController.removeDislike(post.post_id, likedByUser, dislikedByUser, userId)
                .then(()=>{
                    setNumDislikes(numDislikes - 1);
                    setDislikedByUser(false);
                })
                .catch();
        }
        else{
            LikesController.addDislike(post.post_id, likedByUser, dislikedByUser, userId).then(() => {
                setNumDislikes(numDislikes+1);
                setDislikedByUser(true);
                if(likedByUser){
                    setNumLikes(numLikes-1);
                    setLikedByUser(false);
                }
            });
        }
    };

    const compressNum = (num) => {

        if ((num / 1000000000) >= 1) {
            if ((num % 1000000000) < (0.1 * 1000000000)) {
                return Math.floor(num / 1000000000).toString() + "B";
            }
            return (num / 1000000000).toFixed(1).toString() + "B";
        }
        if ((num / 1000000) >= 1) {
            if ((num % 1000000) < (0.1 * 1000000)) {
                return Math.floor(num / 1000000).toString() + "M";
            }
            return (num / 1000000).toFixed(1).toString() + "M";
        }
        if ((num / 1000) >= 1) {
            if ((num % 1000) < (0.1 * 1000)) {
                return Math.floor(num / 1000).toString() + "K";
            }
            return (num / 1000).toFixed(1).toString() + "K";
        }
        return num;
    };

    const handleError = (message) => {
        console.log(message);
        setErrorMessage(message);
        setShowError(true);
    };

    const isOwner = () => {
        if(post === null) return false;
        return post.user_id == userId;
    }

    return (
        <div className="view-post-container">
            <div className="post-section">
                <div className="wrapper">
                    <div className="post-container">
                        <div className="view-post-header">
                            <div className="view-post-title">
                                <h1 id="post-title">{post === null ? "" : post.title}</h1>
                            </div>
                            <div className="user-post-date">
                                <span id="view-post-author">{post === null ? "" : `@${post.username}`}</span>
                                <span id="view-post-date">{post === null ? "" : post.created_at}</span>
                            </div>
                        </div>
                        <div className="view-post-body">
                            <Card className="view-post-card">
                                <div className="view-post-options">
                                    <Dropdown autoClose="outside" drop="down">
                                        <DropdownButton className="icon-dropdown-toggle options_btn" variant="link"
                                                        drop="start"
                                                        title={
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                 height="20"
                                                                 fill="currentColor"
                                                                 className="bi bi-three-dots-vertical"
                                                                 viewBox="0 0 16 16">
                                                                <path
                                                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                                            </svg>
                                                        } disabled={isOwner() || userType === 'guest'}>
                                            <Dropdown.Item className="option" eventKey="1"
                                                           onClick={() => handleReport(true)}>Report
                                                post</Dropdown.Item>
                                            <Dropdown.Item className="option" eventKey="2"
                                                           onClick={() => handleReport(false)}>Report
                                                user</Dropdown.Item>
                                        </DropdownButton>
                                    </Dropdown>
                                </div>
                                <div className="view-post-text-container">
                                    {<ExpandableText className="comment-text"
                                                     children={post === null ? "" : post.content}
                                                     descriptionLength={SECONDARY_CHARACTER_LIMIT}
                                                     disabled={notOverLimit}/>}
                                </div>
                                <div className="media-btn-container">
                                    <Button className="view-post-media-btn" variant="link" onClick={likeClicked}>
                                        {likedByUser ? <BsHandThumbsUpFill /> : <BsHandThumbsUp/> }
                                        <span>{compressNum(numLikes)}</span>

                                    </Button>
                                    <Button className="view-post-media-btn" variant="link" onClick={dislikeClicked}>
                                        {dislikedByUser ? <BsHandThumbsDownFill /> : <BsHandThumbsDown/> }
                                        <span>{compressNum(numDislikes)}</span>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <div className="comments-section">
                <div className="wrapper">
                    <div className="comments-container">
                        <div className="comments-header">
                            <h1>{comments.length} {comments.length > 1 ? "Comments" : "Comment"}</h1>
                        </div>
                        {(userType !== "admin" && userType !== "member") && (
                            <Link to="/signin" style={{transform: transformValue}}>
                                <Button className="sign-in-button-overlay">
                                    Sign in to view comments
                                </Button>
                            </Link>
                        )}
                        {(userType === "admin" || userType === "member") && (
                            <Comment comment={{
                                "comment_id": -1,
                                "post_id": -1,
                                "user_id": userId,
                                "username": username,
                                "content": ""
                            }} onSubmit={handleOnSubmit}/>

                        )}
                        <div className={userType === "admin" || userType === "member" ? "" : "comments-blurred"}>
                            {comments.map((comment) => (
                                <Comment key={uuidv4()} comment={comment}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <MessageToast
                show={showError}
                message={errorMessage}
                onClose={() => setShowError(false)}
            />
        </div>
    );
};

export default ViewPost;