import React, {useRef, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsPersonCircle } from "react-icons/bs";
import { BsArrowUpCircleFill } from "react-icons/bs";
import './Comment.css';
import ContentEditable from 'react-contenteditable'


const Comment = ({comment, onSubmit}) => {
    const isForm = !!onSubmit;

    const [userComment, setUserComment] = useState("");
    const btnRef = useRef(null);

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            btnRef.current.click();
        }
    }

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    const handleSubmit = ()=>{
        onSubmit({
            "comment_id": 2,
            "post_id": 1,
            "user_id": 1,
            "username": "estjames",
            "content": userComment
        });
    }

    const handleChange = (event) => {
        setUserComment(event.target.value);
    }

    return(
        <div className="profile-page">
            <Container className={isForm ? "comment-container comment-input-container" : "bg-light comment-container"}>
                <div className="user-icon-container">
                    <BsPersonCircle size={35} style={{color: 'darkgray'}} />
                </div>
                <div className="comment-details">
                    <div className="username-container">
                        @{comment.username}
                    </div>
                    <div className="content-container">
                        {isForm
                            ? <form className="comment-form" onSubmit={handleSubmit} onKeyUp={handleKeyUp} onKeyDown={onKeyDown}>
                                <ContentEditable
                                    className="comment-input"
                                    disabled={false}
                                    html={userComment}
                                    onChange={handleChange}/>
                                <button type="submit" className="submit-comment"  disabled={userComment === ""} ref={btnRef}>
                                    <BsArrowUpCircleFill size={20}
                                                         style={userComment === "" ? {color: 'darkgray'} : {color: "#533128"}}/>
                                </button>
                            </form>
                            : <div className="comment-text">
                                {comment.content}
                            </div>
                        }
                    </div>
                </div>
            </Container>
        </div>

    );
}

export default Comment;