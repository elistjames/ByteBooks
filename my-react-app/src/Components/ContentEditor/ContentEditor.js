import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./ContentEditor.css"
import {useNavigate, useParams} from "react-router-dom";
import {getPost} from "../../demoApi";
import ContentEditable from "react-contenteditable";
import Form from "react-bootstrap/Form";
import MainPageController from "../../Controllers/MainPageController";
import {useSession} from "../SessionContext";
import MessageToast from "../MessageToast";

const ContentEditor = () => {
    const { id } = useParams();
    const { userId } = useSession();
    const { username } = useSession();
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState(!id);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if(!newPost){
            MainPageController.getPostById(id, userId).then((postData) => {
                setTitle(postData.title);
                setContent(postData.content);
            }).catch((err) => {
                handleError(err);
            });
        }
    }, [newPost, id, userId]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title === ""){
            handleError("Must have a title")
            return;
        }
        if(content === "") {
            handleError("Cannot be left empty")
            return;
        }

        if(content.length > 1000){
            handleError(`Character count ${content.length}/1000`)
            return;
        }

        if(newPost){
            //create new post
            MainPageController.addPost(userId, username, title, content).then(() => {
                navigate('/');
            }).catch((err) => {
                handleError(err);
            });
        }
        else{
            // update existing post
            MainPageController.updatePost(id, title, content).then(() => {
                navigate(-1);
            }).catch((error) => {
                handleError(error);
            });
        }
    };

    const handleCancel =() => {
        navigate(-1);
    }

    const handleError = (message) => {
        console.log(message);
        setErrorMessage(message);
        setShowError(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="content-editor-wrapper">

                <Card className="content-editor-container">
                    <Card.Header className="edit-title-container">
                        <div className="edit-title">
                            <input type="text" className="edit-title-input" placeholder="Title" value={title}
                                   onChange={handleOnChangeTitle} maxLength={50}/>
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
                        <Button type="submit" className="btn-primary action-btn">{newPost ? "Post" : "Save"}</Button>
                        <Button className="btn-light action-btn" onClick={handleCancel}>Cancel</Button>
                    </Card.Footer>
                </Card>
                <MessageToast
                    show={showError}
                    message={errorMessage}
                    onClose={() => setShowError(false)}
                />
            </div>
        </form>
)
}

export default ContentEditor