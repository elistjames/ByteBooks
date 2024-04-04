import React, {useState, useRef, useEffect, forwardRef} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./ContentCard.css";
import {Dropdown, DropdownButton} from "react-bootstrap";
import { BsHandThumbsUp, BsHandThumbsUpFill, BsHandThumbsDown, BsHandThumbsDownFill, BsChat } from "react-icons/bs";


const ContentCard = ({post}) => {
    const [readMore, setReadMore] = useState(false);
    const containerRef = useRef();
    useEffect(() => {
        if (containerRef.current) {
            setReadMore(containerRef.current.scrollHeight > containerRef.current.clientHeight);
        }

    }, [post.content]);

    const viewPost = () => {
        //TODO: This will go to the 'view post'

    };

    const report = (reportPostMode) => {
        if(reportPostMode){
            //TODO: create report post functionality
        }
        else{
            //TODO: create report user functionality
        }
    }

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
    }

    return(
        <Card className="content-card">
            <div className="header">
                <span className="user-name">@{post.username}</span>
                <div className="options">
                    <Dropdown autoClose="outside" drop="down">
                        <DropdownButton className="icon-dropdown-toggle options_btn" variant="link" drop="start" title={
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                            </svg>
                        }>
                            <Dropdown.Item className="option" eventKey="1" onClick={report(true)}>Report
                                post</Dropdown.Item>
                            <Dropdown.Item className="option" eventKey="2" onClick={report(false)}>Report
                                user</Dropdown.Item>
                        </DropdownButton>
                    </Dropdown>
                </div>
                <h4 className="title">{post.title}</h4>
            </div>
            <div className="body-section">
                <Card.Body className="bg-secondary body">
                    <Card.Text ref={containerRef} className="content-text">{post.content}</Card.Text>

                    {readMore && <div style={{display: "flex", justifyContent: "space-between"}}>
                        <span>...</span><Button className="read-more" href={`viewPost/${post.post_id}`}>Read more</Button>
                    </div>
                    }
                </Card.Body>
            </div>
            <div className="footer">
                <div>
                    <Button className="media-btn" variant="link" >
                        {post.liked_by_user ? <BsHandThumbsUpFill/> : <BsHandThumbsUp/> }
                        <span>{compressNum(post.num_likes)}</span>

                    </Button>
                    <Button className="media-btn" variant="link">
                        {post.disliked_by_user ? <BsHandThumbsDownFill/> : <BsHandThumbsDown/> }
                        <span>{compressNum(post.num_dislikes)}</span>
                    </Button>
                </div>
                <Button className="media-btn" variant="link" href={`viewPost/${post.post_id}`}>
                    <BsChat />
                    <span>{compressNum(post.num_comments)}</span>
                </Button>
            </div>
        </Card>
    );
}



export default ContentCard