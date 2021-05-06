import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";


export const SidebarData = [
    {
        title: 'Início',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: 'Produtor',
        path: '/home',
        icon: <FaIcons.FaHatCowboy />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        subNav: [
            {
                title: 'Cadastrar Produtor',
                path: '/home/producer-form',
                icon: <AiIcons.AiOutlinePlusCircle />,
            },
            {
                title: 'Listar Produtores',
                path: '/home/producer-list',
                icon: <AiIcons.AiOutlineUnorderedList />,
            },
        ],
    },
    {
        title: 'Produto',
        path: '/home',
        icon: <GiIcons.GiFruitBowl />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        subNav: [
            {
                title: 'Cadastrar Produto',
                path: '/home/product-form',
                icon: <AiIcons.AiOutlinePlusCircle />,
            },
            {
                title: 'Listar Produtos',
                path: '/home/product-list',
                icon: <AiIcons.AiOutlineUnorderedList />,
            },
        ],
    },
    {
        title: 'Atividade',
        path: '/home',
        icon: <GiIcons.GiFruitBowl />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        subNav: [
            {
                title: 'Cadastrar Atividade',
                path: '/home/activity-form',
                icon: <AiIcons.AiOutlinePlusCircle />,
            },
            {
                title: 'Listar Produtos',
                path: '/home/activity-list',
                icon: <AiIcons.AiOutlineUnorderedList />,
            },
        ],
    },
    {
        title: 'Sair',
        path: '/home',
        icon: <GiIcons.GiExitDoor />,
    },
]