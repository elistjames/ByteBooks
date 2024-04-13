import React from "react";
import { Navbar, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import "./../App.css";
import bytebooksLogo from "./../media/navbarLogo.png";
import { useSession } from "./SessionContext";

const HeaderBar = () => {
    const { userType } = useSession(); // Access userType from SessionContext

    const handleLogoClick = (e) => {
        e.preventDefault();
        window.location.href = '/';
    };

    return (
        <div className="top-nav">
            <Navbar
                fixed="top"
                expand="lg"
                variant="dark"
                className="top-nav justify-content-between"
            >
                <div>#</div>
                <div style={{ textAlign: "center", paddingLeft: "20px"}}>
                    <Navbar.Brand>
                        <a href="/" onClick={handleLogoClick}>
                            <img 
                                src={bytebooksLogo}
                                alt="ByteBooks"
                                className="logo-image"
                            />
                        </a>
                    </Navbar.Brand>
                </div>
                <div>
                    <Nav>
                        <Nav.Item className="sign-in-icon">
                            {userType === "admin" || userType === "member" ? (
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="sign-out-tooltip">Sign Out</Tooltip>}
                                >
                                    <Link to="/signOut">
                                        <PiSignOut style={{ color: "white", paddingRight: "10px", paddingTop: "2px", transform: "scale(1.8)" }} />
                                    </Link>
                                </OverlayTrigger>
                            ) : (
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="sign-in-tooltip">Sign In</Tooltip>}
                                >
                                    <Link to="/signIn">
                                        <PiSignIn style={{ color: "white", paddingRight: "10px", paddingTop: "2px", transform: "scale(1.8)" }} />
                                    </Link>
                                </OverlayTrigger>
                            )}
                        </Nav.Item>
                    </Nav>
                </div>
            </Navbar>
        </div>
    );
}

export default HeaderBar;
