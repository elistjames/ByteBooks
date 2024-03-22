import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideNavBar from "./Components/SideNavbar";
import HeaderBar from "./Components/HeaderBar";
import Profile from "./Components/Profile";
// import Home from "./Components/Home";

const App = () => (
  <Router>
    <div className="app">
      <HeaderBar/>
      <SideNavBar />
    </div>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/home" element={<Home />} */}
      </Routes>
  </Router>
);

export default App;
