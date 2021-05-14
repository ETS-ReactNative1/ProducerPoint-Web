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
        path: '#',
        icon: <FaIcons.FaHatCowboy />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        subNav: [
            {
                title: 'Cadastrar',
                path: '/producer-form',
                icon: <AiIcons.AiOutlinePlusCircle />,
            },
            {
                title: 'Listar',
                path: '/producer-list',
                icon: <AiIcons.AiOutlineUnorderedList />,
            },
        ],
    },
    {
        title: 'Produto',
        path: '#',
        icon: <GiIcons.GiFruitBowl />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        subNav: [
            {
                title: 'Cadastrar',
                path: '/product-form',
                icon: <AiIcons.AiOutlinePlusCircle />,
            },
            {
                title: 'Listar',
                path: '/product-list',
                icon: <AiIcons.AiOutlineUnorderedList />,
            },
        ],
    },
    {
        title: 'Atividade',
        path: '#',
        icon: <MdIcons.MdWork/>,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        subNav: [
            {
                title: 'Cadastrar',
                path: '/activity-form',
                icon: <AiIcons.AiOutlinePlusCircle />,
            },
            {
                title: 'Listar',
                path: '/activity-list',
                icon: <AiIcons.AiOutlineUnorderedList />,
            },
        ],
    },
    {
        title: 'Sair',
        path: '/',
        icon: <GiIcons.GiExitDoor />,
    },
]