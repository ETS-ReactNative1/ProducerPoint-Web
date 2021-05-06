import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import { SidebarData } from './SidebarData'
import SubMenu from '../SubMenu';
import { IconContext } from 'react-icons/lib';

const SideBar = () => {

    const [sidebar, setSidebar] = useState(false)

    const openSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <IconContext.Provider value={{ color: '#000' }}>
                <Nav>
                    <NavIcon to='#'>
                        <FaIcons.FaBars onClick={openSidebar} />
                    </NavIcon>
                </Nav>

                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to='#'>
                            <AiIcons.AiOutlineClose onClick={openSidebar} />
                        </NavIcon>
                        {SidebarData.map((i, k) => {
                            return <SubMenu data={i} k={k} />
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
}

export default SideBar

const Nav = styled.div`
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled(Link)`
    height: 80px;
    margin-left: 2em;
    font-size: 2em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background-color: #fff;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;


