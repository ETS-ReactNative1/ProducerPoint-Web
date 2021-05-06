import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons/lib';

const SubMenu = ({ data }) => {

    const [subnav, setSubnav] = useState(false)

    const openSubnav = () => setSubnav(!subnav)

    return (
        <>
            <IconContext.Provider value={{ color: '#000' }}>
                <SidebarLink
                    to={data.path}
                    onClick={data.subNav && openSubnav}
                >
                    <div>
                        {data.icon}
                        <SidebarLabel>{data.title}</SidebarLabel>
                    </div>
                    <div>
                        {
                            data.subNav && subnav
                                ? data.iconOpened
                                : data.subNav
                                    ? data.iconClosed
                                    : null
                        }
                    </div>
                </SidebarLink>
                {subnav && data.subNav.map((i, k) => {
                    return (
                        <DropdownLink to={i.path} key={k}>
                            {i.icon}
                            <SidebarLabel style={{ marginRight: 16 }}>{i.title}</SidebarLabel>
                        </DropdownLink>
                    )
                })}
            </IconContext.Provider>
        </>
    )
}

export default SubMenu

const SidebarLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;

    &:hover {
        background: rgb(0,0,0,0.3);
        border-left: 4px solid #007200;
        cursor: pointer;
    }

`;

const SidebarLabel = styled.span`
    color: #000;
    margin-left: 16px;
`;

const DropdownLink = styled(Link)`
    background: rgb(0,0,0,0.1);
    height: 45px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 15px;
    margin-bottom: 1px;


    &:hover {
        background: rgb(0,0,0,0.3);
        border-left: 4px solid #70e000;
        cursor: pointer;
    }

`;
