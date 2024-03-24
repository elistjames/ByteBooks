import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PiSignIn } from "react-icons/pi";
import "./../App.css";
import bytebooksLogo from "./../media/navbarLogo.png";

const HeaderBar = () => {

    return (
      <div className="top-nav">
        <Navbar
          fixed="top"
          expand="lg"

          variant="dark"
          className="top-nav justify-content-between"
        >
            <div>#</div>
          <div style={{
              textAlign: "right"
               }}>
            <Navbar.Brand>
              <Link to="/"><img 
                  src={bytebooksLogo}
                  alt="ByteBooks"
                  className="logo-image"
              />
              </Link>
            </Navbar.Brand>
          </div>
          <div style={{ marginRight: 10}}>
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

export default HeaderBar;
