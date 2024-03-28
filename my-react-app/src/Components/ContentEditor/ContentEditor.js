import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import "./ContentEditor.css"
import {useParams} from "react-router-dom";
import {getPost} from "../../demoApi";

const ContentEditor = ({newPost}) => {
    const { id } = useParams();
    if(!newPost){

        const post = getPost(id);
    }
    return (
        <div class="content-editor-wrapper">
            <Card className="content-editor-container">
                <Card.Header className="edit-title-container">
                    <div className="edit-title-container">
                        <div className="edit-title">
                            <Card.Text></Card.Text>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body className="edit-post-container">

                </Card.Body>
                <Card.Footer className="submit-post-container">

                </Card.Footer>
            </Card>
        </div>


    )
}

export default ContentEditor