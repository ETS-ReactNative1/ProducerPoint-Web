import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
    {
        title: 'Início',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: 'Produtor',
        path: '/producer-list',
        icon: <FaIcons.FaHatCowboy />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
    },
    {
        title: 'Produto',
        path: '/product-list',
        icon: <GiIcons.GiFruitBowl />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
    },
    {
        title: 'Atividade',
        path: '/activity-list',
        icon: <MdIcons.MdWork />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
    },
    /*{
        title: 'Sair',
        path: '/',
        icon: <GiIcons.GiExitDoor />,
    },*/
]