import React, {useRef, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsPersonCircle } from "react-icons/bs";
import { BsArrowUpCircleFill } from "react-icons/bs";
import './Comment.css';
import ContentEditable from 'react-contenteditable'
import {Button} from "react-bootstrap";
import {useSession} from "../SessionContext";
import { PiTrash } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";
const Comment = ({comment, is_form, onSubmit, deleteComment}) => {
    const isForm = is_form === "true";
    const {userId} = useSession();
    const [userComment, setUserComment] = useState("");
    const [editedComment, setEditedComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const btnRef = useRef(null);
    const updateBtnRef = useRef(null);

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            if(editComment){
                updateBtnRef.current.click();
            }
            else{
                btnRef.current.click();
            }
        }
    }

    const onKeyDown = (event) => {

        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    const handleDeleteComment = () => {
        deleteComment(comment);
    }

    const handleSubmit = (event)=>{
        setLoading(true);
        event.preventDefault();
        onSubmit(editComment ? editedComment : userComment, comment);
        if(editComment){
            if(editedComment !== null){
                if(editedComment.length < 225){
                    setEditedComment("");
                }
            }
        }
        else{
            if(userComment !== null){
                if(userComment.length < 225){
                    setUserComment("");
                }
            }
        }
        setLoading(false);
    }

    const handleChange = (event) => {
        setUserComment(event.target.value);
    }

    const editCommentToggled = () => {
        if(editComment){
            setEditedComment("");
        }
        else{
            setEditedComment(comment.content);
        }
        setEditComment(!editComment);
    }

    const commentEdited = (event) => {
        setEditedComment(event.target.value);
    }

    const isOwner = () => {
        if(comment === null) return false;
        return comment.user_id.toString() === userId;
    };

    return(
        <Container className={isForm ? "comment-container comment-input-container" : "bg-light comment-container"}>
            <div className="user-icon-container">
                <BsPersonCircle size={35} style={{color: 'darkgray'}} />
            </div>
            <div className="comment-details">
                <div className="comment-details-header">
                    <div className="username-container">
                        @{comment.username}
                    </div>
                    <div className="comment-options-container">
                        {(!isForm && isOwner()) &&
                            <Button className="comment-options-btn" variant="link" onClick={editCommentToggled}>
                                <TbEdit size={18}/>
                            </Button>
                        }
                        {(!isForm && isOwner()) &&
                            <Button className="comment-options-btn" variant="link" onClick={handleDeleteComment}>
                                <PiTrash size={18}/>
                            </Button>
                        }
                    </div>
                </div>
                <div className="content-container">
                    {isForm
                        ? <form className="comment-form" onSubmit={handleSubmit} onKeyUp={handleKeyUp}
                                onKeyDown={onKeyDown}>
                            <ContentEditable
                                className="comment-input"
                                disabled={loading}
                                html={userComment}
                                onChange={handleChange}/>
                            <button type="submit" className="submit-comment"
                                    disabled={userComment === "" || loading} ref={btnRef}>
                                <BsArrowUpCircleFill size={20}
                                                     style={userComment === "" ? {color: 'darkgray'} : {color: "#533128"}}/>
                            </button>
                        </form>
                        : <div className="comment-text">
                            {(editComment && isOwner()) ?
                                <form className="comment-form" onSubmit={handleSubmit} onKeyUp={handleKeyUp}
                                      onKeyDown={onKeyDown}>
                                    <ContentEditable
                                        className="comment-input"
                                        disabled={loading}
                                        html={editedComment}
                                        onChange={commentEdited}/>
                                    <button type="submit" className="submit-comment"
                                            disabled={editedComment === "" || loading} ref={updateBtnRef}>
                                        <BsArrowUpCircleFill size={20}
                                                             style={editedComment === "" ? {color: 'darkgray'} : {color: "#533128"}}/>
                                    </button>
                                </form>
                                :
                                comment.content
                            }
                        </div>
                    }
                </div>
            </div>
        </Container>
    );
}

export default Comment;