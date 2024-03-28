import React, {useState} from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import "./ContentEditor.css"
import {Navigate, useLocation, useParams} from "react-router-dom";
import {getPost} from "../../demoApi";
import ContentEditable from "react-contenteditable";
import Form from "react-bootstrap/Form";

const ContentEditor = ({createPost}) => {
    const { id } = useParams();

    let postTitle = "";
    let postContent = "";

    const location = useLocation();
    const [newPost, setNewPost] = useState(createPost)

    if(!newPost){

        const post = getPost(id);
        postTitle = post.title;
        postContent = post.content;
    }

    const [title, setTitle] = useState(postTitle);
    const [content, setContent] = useState(postContent);

    const handleOnChangeTitle = (e) => {
        if(!e.target.value){
            setTitle("");
        }
        else{
            setTitle(e.target.value);
        }
    };

    const handleOnChangeContent = (e) => {

        if(!e.target.value){
            setContent("");
        }
        else{
            setContent(e.target.value);
        }

    };

    const handleSubmit = () => {

    };

    const handleCancel =() => {


    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="content-editor-wrapper">

            <Card className="content-editor-container">
                <Card.Header className="edit-title-container">
                    <div className="edit-title">
                        <input type="text" className="edit-title-input" placeholder="Title" value={title}
                               onChange={handleOnChangeTitle}/>
                    </div>
                </Card.Header>
                <Card.Body className="edit-post-container">
                        <div className="edit-post">
                            <ContentEditable
                                className="edit-post-input"
                                disabled={false}
                                html={content}
                                required={false}
                                onChange={handleOnChangeContent}/>
                        </div>
                </Card.Body>
                <Card.Footer className="edit-post-actions">
                    <Button className="btn-primary action-btn">{newPost ? "Post" : "Save"}</Button>
                    <Button className="btn-light action-btn" onClick={handleCancel}>Cancel</Button>
                </Card.Footer>
            </Card>

        </div>
    </form>
)
}

export default ContentEditor