import React from "react";
import { Card } from "react-bootstrap";
import CardContent from '@mui/material/CardContent';
import { TextField } from "@mui/material";
import Button from "react-bootstrap/Button";

import "./ContentEditor.css"

const ContentEditor = ({post}) => {
    return (
        <div>
            <h1 className="edit-title">
                <TextField className="edit-title-font"
                    required 
                    label="Title"
                    defaultValue={post.title}
                    fullWidth
                />
            </h1>
            <Card className="edit-card">
                <CardContent>
                    <p className="edit-content">
                        <TextField
                            required
                            defaultValue={post.content}
                            fullWidth
                            multiline
                        />
                    </p>
                </CardContent>
            </Card>
            <div className="edit-button">
                <Button>Post</Button>
            </div>
        </div>
    )
}

export default ContentEditor