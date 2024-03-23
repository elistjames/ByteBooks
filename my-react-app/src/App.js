import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideNavBar from "./Components/SideNavbar";
import HeaderBar from "./Components/HeaderBar";
import Profile from "./Components/Profile";
import MainPage from "./Components/MainPage";
import SideNavBar from "./Components/SideNavbar";
// import SignIn from "./Components/SignIn";
// import SignOut from "./Components/SigOut";
// import Register from "./Components/Register";
// import Admin from "./Components/Admin";

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
                            {/* <Route path="signin" element={<SignIn/>}/>
                            <Route path="signout" element={<SignOut/>}/>
                            <Route path="register" element={<Register/>}/>
                            <Route path="admin" element={<Admin/>}/> */}
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    )

ReactDOM.render(<App />, document.getElementById("root"));
export default App;