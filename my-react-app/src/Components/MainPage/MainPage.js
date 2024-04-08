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
import ConfirmationModal from "../ConfirmationCard/ConfirmationModal";
import ConfirmationToast from "../ConfirmationCard/ConfirmationToast";
import MessageToast from "../MessageToast";

const MainPage = () =>
{
    const { userType, username, userId } = useSession();
    const [posts, setPosts] = useState([]);
    const [modalDialog, setModalDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedPostId, setSelectedPostId] = useState();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // useEffect means run this when component renders
    useEffect(() => {
        console.log(`${userType}, ${username}, ${userId}`);
        MainPageController.getAllPosts(userId).then((data) => {
            setPosts(data);
        });
    }, [userId, username, userType]);

    const handleOnSubmitSearch = (search) => {
        MainPageController.getSearchedPosts(search).then((data) => {
            setPosts(data);
        });
    };

    const deletePost = () => {
        setModalDialog(false);
        if(!selectedPostId) return;
        MainPageController.deletePost(selectedPostId).then((response) => {
            const post = posts.find(post => post.post_id === selectedPostId);
            if(post) {
                const index = posts.indexOf(post);
                if(index < 0) {
                    return;
                }
                setPosts((prev) => {
                    const clonePosts = [...prev];
                    clonePosts.splice(index, 1);
                    return clonePosts;}
                );

                setToastMessage(response);
                setShowToast(true);
            }
        }).catch(err => {
            handleError(err);
        });
    };

    const handleDeletePost = (post_id) => {
        setSelectedPostId(post_id);
        setDialogMessage("Are you sure you want to delete this post?");
        setModalDialog(true);
    };

    const handleError = (message) => {
        console.log(message);
        setErrorMessage(message);
        setShowError(true);
    };


    return(
        <div className=" main-page-container">
            <SearchBar onSubmit={handleOnSubmitSearch}/>
            {userType !== 'guest' &&
                <Button variant="primary" className="post-btn" href={`createPost`}>
                    <PiPlusBold size={40} className="post-mobile"/>
                </Button>
            }
            <div className="main-page-body">
                <div className="content-flex-container">
                    {posts.map((post) => (
                        <ContentCard key={uuidv4()} post={post} deletePost={handleDeletePost}/>
                    ))}
                </div>
            </div>
            <ConfirmationModal
                show={modalDialog}
                onHide={() => setModalDialog(false)}
                onConfirm={deletePost}
                message={dialogMessage}
            />
            <ConfirmationToast
                show={showToast}
                message={toastMessage}
                onClose={() => setShowToast(false)}
            />
            <MessageToast
                show={showError}
                message={errorMessage}
                onClose={() => setShowError(false)}
            />
        </div>
    );
}

export default MainPage;