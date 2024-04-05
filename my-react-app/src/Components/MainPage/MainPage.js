import React, {useEffect, useState} from 'react';
import SearchBar from "../SearchBar";
import Button from "react-bootstrap/Button";
import { PiPlusBold } from "react-icons/pi";
import './MainPage.css';
import ContentCard from "../ContentCard/ContentCard";
import postData from "../../demoData/posts.json";
import { v4 as uuidv4 } from 'uuid';
import MainPageController from "../../Controllers/MainPageController";
import { useSession } from "../SessionContext";

const MainPage = () =>
{
    const { userId } = useSession();
    const [posts, setPosts] = useState([]);

    // useEffect means run this when component renders
    useEffect(() => {
        MainPageController.getAllPosts(userId).then((data) => {
            setPosts(data);
        });
    }, [userId]);

    const handleOnSubmitSearch = (search) => {
        MainPageController.getSearchedPosts(search).then((data) => {
            setPosts(data);
        });
    }


    return(
        <div className=" main-page-container">
            <SearchBar onSubmit={handleOnSubmitSearch}/>
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