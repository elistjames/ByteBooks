import React from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Link } from "react-router-dom";

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
          <NavItem eventKey="profile">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText><Link to="/profile">Profile</Link></NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
}

export default React.forwardRef((props, ref) => {
    return <SideNavBar forwardedRef={ref} {...props} />
})
