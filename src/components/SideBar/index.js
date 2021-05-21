import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { SidebarData } from './SidebarData'
import SubMenu from '../SubMenu';
import { IconContext } from 'react-icons/lib';

const SideBar = ({ show }) => {

    return (
        <IconContext.Provider value={{ color: '#000' }}>

            <SidebarNav sidebar={show}>
                <SidebarWrap>
                    {SidebarData.map((i, k) => {
                        return <SubMenu data={i} k={k} />
                    })}
                </SidebarWrap>
            </SidebarNav>
        </IconContext.Provider>
    );
}

export default SideBar

const SidebarNav = styled.nav`
    background-color: #fff;
    width: 13%;
    max-width: 170px;
    height: 100vh;
    margin-top: 65px;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
    border-right: 1px solid #ccc;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;


