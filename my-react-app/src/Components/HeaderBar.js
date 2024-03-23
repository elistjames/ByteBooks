import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PiSignIn } from "react-icons/pi";
import "./../App.css";
import bytebooksLogo from "./../media/navbarLogo.png";

class HeaderBar extends React.Component {
  render() {
    return (
      <div className="topnav">
        <Navbar
          fixed="top"
          expand="lg"
          bg="dark"
          variant="dark"
          className="topnav"
        >
          <div style={{ textAlign: "center" }}>
            <Navbar.Brand>
              <Link to="/"><img 
                  src={bytebooksLogo}
                  alt="ByteBooks"
                  className="logo-image"
              />
              </Link>
            </Navbar.Brand>
          </div>
          <div style={{ textAlign: "right", paddingRight: "30px", marginTop: "-35px" }}>
            <Nav>
              <Nav.Item className="sign-in-icon">
                <Link to="/signin">
                  <PiSignIn style={{ color: "white", transform: "scale(1.7)"}}/>
                </Link>
              </Nav.Item>
            </Nav>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default HeaderBar;
