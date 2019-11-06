import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React from 'react';
import styled from 'styled-components'; 
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const SideBar = styled.div`
  position: sticky;
`;

const Side = () => {

  return(
    <SideBar>
    <SideNav
        onSelect={(selected) => {
            // Add your code here
        }}
        style={{
            position: 'fixed',
            overflow: 'auto'
          }}
    >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
            <NavItem eventKey="charts">
                <NavIcon>
                    <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Charts
                </NavText>
                <NavItem eventKey="charts/linechart">
                    <NavText>
                        Line Chart
                    </NavText>
                </NavItem>
                <NavItem eventKey="charts/barchart">
                    <NavText>
                        Bar Chart
                    </NavText>
                </NavItem>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
    </SideBar>
  )
}

export default Side