import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PiSignIn } from "react-icons/pi";
import "./../App.css";
import bytebooksLogo from "./../media/navbarLogo.png";

const HeaderBar = () => {
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
                            <Link to="/signIn">
                                <PiSignIn style={{ color: "white", paddingRight: "10px", paddingTop: "2px", transform: "scale(1.8)" }} />
                            </Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </Navbar>
        </div>
    );
}

export default HeaderBar;
