import React, {useRef, useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderBar from "./Components/HeaderBar";
import Profile from "./Components/Profile";
import MainPage from "./Components/MainPage";
import SideNavBar from "./Components/SideNavbar";
// import Home from "./Components/Home";

const App = () => {
    const sideNavRef = useRef();
    const [expanded, setExpanded] = useState(false)
    const expand = (state) => {
        setExpanded(state);
    }
    return (
        <div className="app" >
            <Router>
                <HeaderBar/>
                <div>
                    <SideNavBar ref={sideNavRef} onClick={expand}/>
                    <div className="viewport" style={{
                        marginLeft: expanded ? 240 : 64,
                        padding: '15px 20px 0 20px'
                    }}>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path="profile" element={<Profile/>}/>
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    )

}
export default App;