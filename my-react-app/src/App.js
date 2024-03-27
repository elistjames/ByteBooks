import React, {useRef, useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderBar from "./Components/HeaderBar";
import Profile from "./Components/Profile";
import MainPage from "./Components/MainPage/MainPage";
import ViewPost from "./Components/ViewPost/ViewPost"
import SideNavBar from "./Components/SideNavbar";
import postData from './demoData/posts.json';
// import SignIn from "./Components/SignIn";
// import SignOut from "./Components/SigOut";
// import Register from "./Components/Register";
// import Admin from "./Components/Admin";
import BottomBar from "./Components/BottomBar";
import { useMediaQuery } from 'react-responsive';

const App = () => {

    const isMobile = useMediaQuery({
        query: '(max-width: 767px)'
    });
    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)'
    });
    const sideNavRef = useRef();
    const [expanded, setExpanded] = useState(false)
    const [posts, setPosts] = useState(postData);
    const expand = (state) => {
        setExpanded(state);
    };

    return (
        <div className="app">
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
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/admin" element={<Admin />} />
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
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/viewPost/:id" element={<ViewPost />} />
                            </Routes>
                        </div>
                        <BottomBar />
                    </div>
                )}
            </Router>
        </div>
    )
}

export default App;
