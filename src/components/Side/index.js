import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React from 'react';
import styled from 'styled-components'; 
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FaUserTie } from "react-icons/fa";
import { FaSimCard } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { withRouter } from 'react-router-dom';
import { MdPhoneAndroid } from "react-icons/md";
import { MdLaptop } from "react-icons/md";

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

const ChipIcon = styled(FaSimCard)`
  width: 25px;
  height: 25px;
  margin: 0 0 10px 0;
`;

const CelIcon = styled(MdPhoneAndroid)`
  width: 27px;
  height: 27px;
  margin: 0 0 10px 0;
`;

const NotebookIcon = styled(MdLaptop)`
  width: 27px;
  height: 27px;
  margin: 0 0 10px 0;
`;

const segmentURL = () => {
    return window.location.pathname.split("/").pop();
}

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
        <SideNav.Nav defaultSelected={segmentURL()}>
            <NavItem eventKey="home" onClick={() => history.replace('/')}>
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    <HomeIcon/>
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
            <NavItem eventKey="persons" onClick={() => history.replace('/persons')}>
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    <PersonIcon />
                </NavIcon>
                <NavText>
                    Funcionários
                </NavText>
            </NavItem>
            <NavItem eventKey="cels" onClick={() => history.replace('/cels')}>
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    <CelIcon/>
                </NavIcon>
                <NavText>
                    Smartphones
                </NavText>
            </NavItem>
            <NavItem eventKey="chips" onClick={() => history.replace('/chips')}>
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    <ChipIcon/>
                </NavIcon>
                <NavText>
                    Chips
                </NavText>
            </NavItem>
            <NavItem eventKey="notebooks" onClick={() => history.replace('/notebooks')}>
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    <NotebookIcon/>
                </NavIcon>
                <NavText>
                    Notebooks
                </NavText>
            </NavItem>
            {/* <NavItem eventKey="equip">
                <NavIcon>
                    <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    <CelIcon/>
                </NavIcon>
                <NavText>
                    Equipamentos
                </NavText>
                <NavItem eventKey="equip/all">
                    <NavText>
                        Todos
                    </NavText>
                </NavItem>
                <NavItem eventKey="equip/phone" onClick={() => history.replace('/cels')}>
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
            </NavItem> */}
        </SideNav.Nav>
    </SideNav>
    </SideBar>
  )
}

export default withRouter(Side);