import React, {useState} from 'react';
import SearchBar from "../SearchBar";
import Button from "react-bootstrap/Button";
import { PiPlusBold } from "react-icons/pi";
import './MainPage.css';
import ContentCard from "../ContentCard/ContentCard";
import postData from "../../demoData/posts.json";
import { v4 as uuidv4 } from 'uuid';

const MainPage = () =>
{
    const [posts, setPosts] = useState(postData);

    return(
        <div className=" main-page-container">
            <SearchBar />
            <Button variant="primary" className="post-btn" href={`createPost`}>
                <PiPlusBold size={40} className="post-mobile"/>
            </Button>
            <div className="main-page-body">
                <div className="content-flex-container">
                    {posts.map((post) => (
                        <ContentCard key={uuidv4()} post={post}/>
                    ))}
                </div>
            </div>
        </div>


    );
}

export default MainPage;