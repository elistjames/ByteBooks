import React from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHomeOutline, IoPersonOutline, IoBarChartOutline } from "react-icons/io5";
import { useSession } from "./SessionContext";

import SideNav, {
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

const SideNavBar = () => {
  const location = useLocation();
  const { pathname } = location;
  const { userType } = useSession();
  const navigate = useNavigate();

  const getDefaultSelected = () => {
    switch (pathname) {
      case "/":
        return "home";
      case "/profile":
        return "profile";
      case "/admin":
        return "admin";
      default:
        return "home";
    }
  };
  if (userType === "guest") {
    return null;
  }

  return (
    <SideNav style={{
      background: '#533128',
      color: 'white',
      position: 'fixed',
    }}>
      <SideNav.Toggle />
        <SideNav.Nav defaultSelected={getDefaultSelected()}>
          <NavItem eventKey="home" selected={pathname === "/"} onClick={() => navigate("/")}>
            <NavIcon>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <IoHomeOutline style={{marginBottom: "5px"}} />
              </Link>
            </NavIcon>
            <NavText>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="profile" selected={pathname === "/profile"} onClick={() => navigate("/profile")}>
            <NavIcon>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <IoPersonOutline style={{marginBottom: "5px"}} />
              </Link>
            </NavIcon>
            <NavText>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>
            </NavText>
          </NavItem>
          {userType === "admin" && (
            <NavItem eventKey="admin" selected={pathname === "/admin"} onClick={() => navigate("/admin")}>
              <NavIcon>
                <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <IoBarChartOutline  style={{marginBottom: "5px"}}/>
                </Link>
              </NavIcon>
              <NavText>
                <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>Admin</Link>
              </NavText>
            </NavItem>
          )}
        </SideNav.Nav>
    </SideNav>
  );
};


export default SideNavBar;
