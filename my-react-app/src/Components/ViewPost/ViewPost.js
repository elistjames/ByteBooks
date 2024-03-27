import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import CardContent from '@mui/material/CardContent';
import Button from 'react-bootstrap/Button';
import {Dropdown, DropdownButton} from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
import {getPost} from '../../demoApi';
import Comment from '../Comment/Comment';
import { v4 as uuidv4 } from 'uuid';

import ExpandableText from "./ExpandableText";

import "./ViewPost.css"
import {useParams} from "react-router-dom";

const report = (reportPostMode) => {

    if (reportPostMode) {
        //TODO: create report post functionality
    }
    else {
        //TODO: create report user functionality
    }
}

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
}

const diplayTest = (limit) => {
    let text = "";
    let i = 0;
    for (; i < limit; i++ ) {
        text += "a";
    }
    return text;
}

const ViewPost = () => {

    const [comments, setComments] = useState([
            {
                "comment_id": 1,
                "post_id": 1,
                "user_id": 1,
                "username": "estjames",
                "content": "Wow, this photo is giving me all the wanderlust feels! ✨ Where was this taken? I need to add it to my travel bucket list ASAP! 🌍💼 #Wanderlust #TravelGoals"
            },
            {
                "comment_id": 2,
                "post_id": 1,
                "user_id": 1,
                "username": "estjames",
                "content": "Wow, this photo is giving me all the wanderlust feels! ✨"
            },
            {
                "comment_id": 3,
                "post_id": 1,
                "user_id": 1,
                "username": "estjames",
                "content": "Wow, this photo is giving me all the wanderlust feels! ✨ ht. In dreams, we wander, free to roam, Through fields of gold and forests of foam, Where fantasies dance in endless array, And reality's grip begins to sway. A kaleidoscope of colors unfurl, As imagination spins and whirls, Painting pictures upon the mind, Of treasures rare and undefined. In this realm, time takes flight, And worries fade into the night, For dreams are the bridge that spans, Between the earth and far-off lands. So close your eyes and dare to dream, Let your spirit soar on silent stream, For in the realm of dreams, you'll find, The"
            },
        ]
    );

    const handleOnSubmit =(com)=>{
        if(com != null){

            setComments((prev) => {
                const cloneComments = [...prev];
                cloneComments.unshift(com);
                return cloneComments;
            });
        }
    };

    const { id } = useParams();
    const post = getPost(id);
    // const comments = getComments(post.post_id);   api call to get comments for post
    const SECONDARY_CHARACTER_LIMIT = 450;

    let isMobile = useMediaQuery({
        query: '(max-width: 767px)'
    });

    let notOverLimit = true;
    if (post.content.length > SECONDARY_CHARACTER_LIMIT && isMobile) {
        notOverLimit = false;
    }

    return (
        <div className="view-post-container">
            <div className="post-section">
                <div className="post-container">
                    <div className="view-post-header">
                        <div className="view-post-title">
                            <h1 id="post-title">{post.title}</h1>
                        </div>
                        <div className="user-post-date">
                            <span id="view-post-author">{post.user_id}</span>
                            <span id="view-post-date">{post.created_at}</span>
                        </div>
                    </div>
                    <div className="view-post-body">
                    <Card className="view-post-card">
                            <div className="view-post-options">
                                <Dropdown autoClose="outside" drop="down">
                                    <DropdownButton className="icon-dropdown-toggle options_btn" variant="link"
                                                    drop="start"
                                                    title={
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                             fill="currentColor"
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
                            <div className="view-post-text-container">
                                {<ExpandableText className="comment-text" children={post.content}
                                                 descriptionLength={SECONDARY_CHARACTER_LIMIT}
                                                 disabled={notOverLimit}/>}
                            </div>
                            <div className="media-btn-container">
                                <Button className="view-post-media-btn" variant="link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                         className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                        <path
                                            d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                    </svg>
                                    <span>{compressNum(post.likes)}</span>

                                </Button>
                                <Button className="view-post-media-btn" variant="link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                         className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                        <path
                                            d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1"/>
                                    </svg>
                                    <span>{compressNum(post.dislikes)}</span>
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="comments-section">
                <div className="comments-container">
                    <div className="comments-header">
                        <h1>{comments.length} {comments.length > 1 ? "Comments" : "Comment"}</h1>
                    </div>
                    <div className="comments-body">
                        <Comment comment={{
                            "comment_id": -1,
                            "post_id": -1,
                            "user_id": 1234535, //TODO: need to passing in session user id
                            "username": "estjames",  // TODO: need to pass in session username
                            "content": ""
                        }} onSubmit={handleOnSubmit}/>
                        {comments.map((comment) => (
                            <Comment key={uuidv4()} comment={comment}/>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ViewPost;