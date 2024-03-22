import React from "react";
import { Navbar} from "react-bootstrap";
import "./navStyles.css";
import { Link } from "react-router-dom";

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
          <Navbar.Brand><Link to="/home">ByteBooks</Link></Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default HeaderBar;
