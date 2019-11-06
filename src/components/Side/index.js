import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React from 'react';
import styled from 'styled-components'; 
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FaUserTie } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { withRouter } from 'react-router-dom';
import { MdPhoneAndroid } from "react-icons/md";

const SideBar = styled.div`
  position: sticky;
`;

const HomeIcon = styled(FaHome)`
  width: 25px;
  height: 25px;
  margin: 0 0 10px 0;
`;

const PersonIcon = styled(FaUserTie)`
  width: 25px;
  height: 25px;
  margin: 0 0 10px 0;
`;


const EquipIcon = styled(MdPhoneAndroid)`
  width: 27px;
  height: 27px;
  margin: 0 0 10px 0;
`;

const Side = ({history}) => {

  return(
    <SideBar>
    <SideNav
        onSelect={(selected) => {
            // Add your code here
        }}
        style={{
            background: '#3c6ac2',
            position: 'fixed',
            overflow: 'auto'
          }}
    >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home" onClick={() => history.replace('/')}>
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    <HomeIcon/>
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
            <NavItem eventKey="person" onClick={() => history.replace('/person')}>
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    <PersonIcon />
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
            <NavItem eventKey="equip">
                <NavIcon>
                    <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    <EquipIcon/>
                </NavIcon>
                <NavText>
                    Equipamentos
                </NavText>
                <NavItem eventKey="equip/all">
                    <NavText>
                        Todos
                    </NavText>
                </NavItem>
                <NavItem eventKey="equip/phone">
                    <NavText>
                        Smartphones
                    </NavText>
                </NavItem>
                <NavItem eventKey="equip/chip">
                    <NavText>
                        Chips
                    </NavText>
                </NavItem>
                <NavItem eventKey="equip/notebook">
                    <NavText>
                        Notebooks
                    </NavText>
                </NavItem>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
    </SideBar>
  )
}

export default withRouter(Side);