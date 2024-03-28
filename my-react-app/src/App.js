import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderBar from "./Components/HeaderBar";
import Profile from "./Components/Profile";
import MainPage from "./Components/MainPage/MainPage";
import SideNavBar from "./Components/SideNavbar";
import postData from './demoData/posts.json';
import BottomBar from "./Components/BottomBar";
import Admin from "./Components/AdminCard/Admin";
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { SessionProvider, useSession } from "./Components/SessionContext";
import SignIn from "./Components/SignIn";
import SignOut from "./Components/SignOut";
import Register from "./Components/Register";
import ViewPost from "./Components/ViewPost/ViewPost";


const App = () => {
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)'
    });
    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)'
    });
    const sideNavRef = useRef();
    const [expanded, setExpanded] = useState(false);
    const [posts, setPosts] = useState(postData);
    const expand = (state) => {
        setExpanded(state);
    };

    return (
        <div className="app">
            <SessionProvider>
                <Router>
                    <HeaderBar />
                    {isDesktop && (
                        <div>
                            <SideNavBar ref={sideNavRef} onClick={expand} />
                            <div className="viewport" style={{
                                marginLeft: expanded ? 240 : 64,
                                padding: '15px 20px 0 20px'
                            }}>
                                <Routes>
                                    <Route path='/' element={<MainPage posts={posts}/>} />
                                    <Route path="/profile" element={<ProtectedProfile />} />
                                    <Route path="/admin" element={<ProtectedAdmin />} /> 
                                    <Route path="/signin" element={<ProtectedSignIn />} />
                                    <Route path="/signout" element={<SignOut />} />
                                    <Route path="/register" element={<ProtectedRegister />} />
                                    <Route path="/viewPost/:id" element={<ViewPost />} />
                                </Routes>
                            </div>
                        </div>
                    )}
                    {isMobile && (
                        <div>
                            <div className="viewport" style={{ padding: '15px 20px 0 20px' }}>
                                <Routes>
                                    <Route path='/' element={<MainPage posts={posts}/>} />
                                    <Route path="/profile" element={<ProtectedProfile />} />
                                    <Route path="/admin" element={<ProtectedAdmin />} /> 
                                    <Route path="/signin" element={<ProtectedSignIn />} />
                                    <Route path="/signout" element={<SignOut />} />
                                    <Route path="/register" element={<ProtectedRegister />} />
                                    <Route path="/viewPost/:id" element={<ViewPost />} />
                                </Routes>
                            </div>
                            <BottomBar />
                        </div>
                    )}
                </Router>
            </SessionProvider>
        </div>
    )
}

const ProtectedProfile = () => {
    const { userType } = useSession();
    const [posts, setPosts] = useState(postData);

    if (userType === 'member' || userType === 'admin') {
        return <Profile />;
    } else {
        return <SignIn/>;
    }
}

const ProtectedRegister = () => {
    const { userType } = useSession();
    const [posts, setPosts] = useState(postData);

    if (userType === 'member' || userType === 'admin') {
        return <MainPage posts={posts} />;
    } else {
        return <Register/>;
    }
}

const ProtectedSignIn = () => {
    const { userType } = useSession();
    const [posts, setPosts] = useState(postData);

    if (userType === 'member' || userType === 'admin') {
        return <MainPage posts={posts}/>;;
    } else {
        return <SignIn />;
    }
}

const ProtectedAdmin = () => {
    const { userType } = useSession();
    const [posts, setPosts] = useState(postData);

    if (userType === 'admin') {
        return <Admin />;
    } if (userType === 'member') {
        return <UnauthorizedAdminPage />;
    } else{
        return <SignIn />;
    }
}

const UnauthorizedAdminPage = () => {
    return (
        <div className="unauthorizedContainer">
            <h2>You must be an admin to view this page.</h2>
            <br></br>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="unauthorizedButton">
                    Home
                </div>
            </Link>
        </div>
    );
};

export default App;
