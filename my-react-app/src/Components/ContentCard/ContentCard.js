import React, {useState, useRef, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./ContentCard.css";
import {Dropdown, DropdownButton} from "react-bootstrap";
import { BsHandThumbsUp, BsHandThumbsUpFill, BsHandThumbsDown, BsHandThumbsDownFill, BsChat } from "react-icons/bs";
import LikesController from "../../Controllers/LikesController";
import {useSession} from "../SessionContext";
import ReportController from "../../Controllers/ReportController";
import MessageToast from "../MessageToast";
import {Link} from "react-router-dom";


const ContentCard = ({post, deletePost}) => {
    const {userType, username, userId } = useSession();
    const [readMore, setReadMore] = useState(false);
    const [likedByUser, setLikedByUser] = useState(post.liked_by_user);
    const [dislikedByUser, setDislikedByUser] = useState(post.disliked_by_user);
    const [numLikes, setNumLikes] = useState(post.num_likes);
    const [numDislikes, setNumDislikes] = useState(post.num_dislikes);
    const [numComments] = useState(post.num_comments);
    const containerRef = useRef();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (containerRef.current) {
            setReadMore(containerRef.current.scrollHeight > containerRef.current.clientHeight);
        }

    }, [post.content]);

    const handleReport = (reportPostMode) => {
        if(reportPostMode){
            ReportController.reportPost(post.post_id, userId, username).then((response) =>{
                handleError(`Post "${post.title}" has been reported.`);
            }).catch((err) => {
                handleError(err);
            });
        }
        else{
            ReportController.reportUser(post.user_id, userId, username).then((response) =>{
                handleError(`User "${post.username}" has been reported.`);
            }).catch((err) => {
                handleError(err);
            });
        }
    };

    const likeClicked = ()=> {
        if(userId === "") return;
        //if post is likes, remove like
        if(likedByUser){
            LikesController.removeLike(post.post_id, userId)
                .then(()=>{
                    setNumLikes(numLikes - 1);
                    setLikedByUser(false);
                })
                .catch((err)=>{
                    console.log("error");
                    handleError(err);
                });
        }
        else{
            LikesController.addLike(post.post_id, likedByUser, dislikedByUser, userId).then(() => {
                setNumLikes(numLikes + 1);
                setLikedByUser(true);
                if(dislikedByUser){
                    setNumDislikes(numDislikes-1);
                    setDislikedByUser(false);
                }
            }).catch((err)=>{
                handleError(err);
            });
        }
    };

    const dislikeClicked = () => {
        if(userId === "") return;
        //if post is disliked, remove dislike
        if(dislikedByUser){
            LikesController.removeDislike(post.post_id, userId)
                .then(()=>{
                    setNumDislikes(numDislikes - 1);
                    setDislikedByUser(false);
                })
                .catch((err)=>{
                    handleError(err);
                });
        }
        else{
            LikesController.addDislike(post.post_id, likedByUser, dislikedByUser, userId).then(() => {
                setNumDislikes(numDislikes+1);
                setDislikedByUser(true);
                if(likedByUser){
                    setNumLikes(numLikes-1);
                    setLikedByUser(false);
                }
            }).catch((err)=>{
                handleError(err);
            });
        }
    };

    const handleDeletePost = () => {
        deletePost(post.post_id);
    };

    const compressNum = (num) => {

        if((num/1000000000) >= 1){
            if((num%1000000000) < (0.1*1000000000)){
                return Math.floor(num/1000000000).toString() + "B";
            }
            return (num/1000000000).toFixed(1).toString() + "B";
        }
        if((num/1000000) >= 1){
            if((num%1000000) < (0.1*1000000)){
                return Math.floor(num/1000000).toString() + "M";
            }
            return (num/1000000).toFixed(1).toString() + "M";
        }
        if((num/1000) >= 1){
            if((num%1000) < (0.1*1000)){
                return Math.floor(num/1000).toString() + "K";
            }
            return (num/1000).toFixed(1).toString() + "K";
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
        return parseInt(post.user_id) === parseInt(userId);
    };

    return(
        <Card className="content-card">
            <div className="header">
                <span className="user-name">@{post.username}</span>
                <div className="options">
                    <Dropdown autoClose="outside" drop="down">
                        <DropdownButton id="options-btn" className="icon-dropdown-toggle" variant="button" drop="start" title={
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                            </svg>
                        }>
                            <Dropdown.Item as="button" className="option" eventKey="1">
                                <Link className="option" to={`/viewPost/${post.post_id}`}>
                                    View post
                                </Link>
                            </Dropdown.Item>
                            {(isOwner() && userType !== 'guest') &&
                                <Dropdown.Item as="button" className="option" eventKey="2">
                                    <Link className="option" to={`/editPost/${post.post_id}`}>
                                        Edit post
                                    </Link>
                                </Dropdown.Item>
                            }
                            {(isOwner() && userType !== 'guest') &&
                                <Dropdown.Item as="button" className="option" eventKey="3" onClick={() => handleDeletePost()}>
                                    Delete post
                                </Dropdown.Item>
                            }
                            {(!isOwner() && userType !== 'guest') &&
                                <Dropdown.Item as="button" className="option" eventKey="4" onClick={() => handleReport(true)}>Report
                                    post
                                </Dropdown.Item>
                            }
                            {(!isOwner() && userType !== 'guest') &&
                                <Dropdown.Item as="button" className="option" eventKey="5" onClick={() => handleReport(false)}>Report user</Dropdown.Item>
                            }

                        </DropdownButton>
                    </Dropdown>
                </div>
                <h4 className="title">{post.title}</h4>
            </div>
            <div className="body-section">
                <Card.Body className="bg-secondary body">
                    <Card.Text ref={containerRef} className="content-text" dangerouslySetInnerHTML={{ __html: post.content }}></Card.Text>

                    {readMore && <div style={{display: "flex", justifyContent: "space-between"}}>
                        <span>...</span><Button className="read-more" href={`/viewPost/${post.post_id}`}>Read more</Button>
                    </div>
                    }
                </Card.Body>
            </div>
            <div className="footer">
                <div>
                    <Button className="media-btn" variant="link" onClick={likeClicked}>
                        {likedByUser ? <BsHandThumbsUpFill /> : <BsHandThumbsUp/> }
                        <span>{compressNum(numLikes)}</span>

                    </Button>
                    <Button className="media-btn" variant="link" onClick={dislikeClicked}>
                        {dislikedByUser ? <BsHandThumbsDownFill /> : <BsHandThumbsDown/> }
                        <span>{compressNum(numDislikes)}</span>
                    </Button>
                </div>
                <Button className="media-btn" variant="link" href={`viewPost/${post.post_id}`}>
                    <BsChat />
                    <span>{compressNum(numComments)}</span>
                </Button>
            </div>
            <MessageToast
                show={showError}
                message={errorMessage}
                onClose={() => setShowError(false)}
            />
        </Card>
    );
}



export default ContentCard