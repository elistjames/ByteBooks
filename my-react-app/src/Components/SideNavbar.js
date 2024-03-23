import React from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Link } from "react-router-dom";
import { IoHomeOutline, IoPersonOutline , IoBarChartOutline } from "react-icons/io5";

import SideNav, {
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  render() {
    const { forwardedRef, onClick } = this.props

    return (
      <SideNav ref={forwardedRef} expanded={this.state.isVisible} style={{
        background: 'rgb(83, 49, 40)',
        color: 'white',
        }}>
        <SideNav.Toggle
          onClick={() => {
            this.setState({ isVisible: !this.state.isVisible });
            onClick(!this.state.isVisible);
          }}
        />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <Link to="/"><IoHomeOutline /></Link>
            </NavIcon>
            <NavText style={{ verticalAlign: 'middle' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="profile">
            <NavIcon>
              <Link to="/profile"><IoPersonOutline/></Link>
            </NavIcon>
            <NavText style={{ verticalAlign: 'middle' }}>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="admin">
            <NavIcon>
              <Link to="/admin"><IoBarChartOutline/></Link>
            </NavIcon>
            <NavText style={{ verticalAlign: 'middle' }}>
              <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>Admin</Link>
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
}

export default React.forwardRef((props, ref) => {
    return <SideNavBar forwardedRef={ref} {...props} />
})
