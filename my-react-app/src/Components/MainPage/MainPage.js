import React from 'react';
import SearchBar from "../SearchBar";
import Button from "react-bootstrap/Button";
import { PiPlusBold } from "react-icons/pi";
import './MainPage.css';
import ContentCard from "../ContentCard/ContentCard";

const MainPage = ({posts}) =>
{
    return(
        <div className=" main-page-container">
            <SearchBar />
            <Button variant="primary" className="post-btn">
                <PiPlusBold size={30} className="post-mobile"/>
                <span className="post-desktop">Post</span>
            </Button>
            <div className="main-page-body">
                {posts.map((post) => (
                    <ContentCard key={post.post_id} post={post}/>
                ))}
            </div>

        </div>



    );
}

export default MainPage;