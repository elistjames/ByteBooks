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
<<<<<<< 3f5449efebad08b06e488e7393f02223ae1c7e00
        background: '#533128',
        color: 'white',
      }}>
=======
        background: 'rgb(83, 49, 40)',
        color: 'white',
        }}>
>>>>>>> 2102544adc0378b34a7bc640a14267d440821840
        <SideNav.Toggle
          onClick={() => {
            this.setState({ isVisible: !this.state.isVisible });
            onClick(!this.state.isVisible);
<<<<<<< 3f5449efebad08b06e488e7393f02223ae1c7e00
=======

>>>>>>> 2102544adc0378b34a7bc640a14267d440821840
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
<<<<<<< 3f5449efebad08b06e488e7393f02223ae1c7e00
});
=======
})
>>>>>>> 2102544adc0378b34a7bc640a14267d440821840
