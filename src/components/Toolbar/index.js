import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
    makeStyles, AppBar, Toolbar, Typography, Button, IconButton, Avatar,
    MenuItem, Menu
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { AuthContext } from '../../contexts/AuthContext'

import logo from '../../assets/images/logo.png'
import ConfimationModal from '../Modals/ConfimationModal'
import SideBar from '../SideBar'
import { doLogout } from '../../services/auth'

const ToolbarWrap = () => {

    const classes = useStyles()
    const location = useLocation()
    const { user } = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null)

    const [confirmModal, setConfirmModal] = useState(false)
    const [showSideBar, setShowSideBar] = useState(false)

    const handleOpenConfirmation = () => setConfirmModal(true)
    const handleCloseConfirmation = () => setConfirmModal(false)
    const changeSideBar = () => setShowSideBar((prevOpen) => !prevOpen)

    const handleLogout = () => {
        doLogout()
        window.location.href = '/'
    }

    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleCloseMenu = () => setAnchorEl(null)

    return (
        <>
            {location.pathname !== '/' &&
                <div className={classes.root}>
                    <AppBar className={classes.appbar} position="static">
                        <Toolbar>
                            <div style={{width: '13%'}}>
                                <IconButton onClick={changeSideBar} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    {showSideBar ? <CancelPresentationIcon /> : <MenuIcon />}
                                </IconButton>
                            </div>
                            <div style={{
                                display: 'flex',
                                flex: 1,
                                alignItems: 'center',
                                maxWidth: 960,
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar
                                        component={Link}
                                        className={classes.logo}
                                        alt="logo producer point"
                                        src={logo}
                                        to='/home'
                                    />
                                    <Typography variant="h6" className={classes.title}>
                                        Olá, {user?.name}
                                    </Typography>
                                </div>
                                <div>
                                    <Button
                                        onClick={handleClick}
                                        color='inherit'
                                        endIcon={<AccountCircleIcon />}
                                    >
                                        Minha Conta
                                </Button>
                                </div>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                    PaperProps={{
                                        style: {
                                            width: '10%',
                                            marginTop: 28,
                                            marginLeft: 3
                                        },
                                    }}
                                >
                                    <MenuItem
                                        component={Link}
                                        to={`/my-profile/${user?.id}/${user?.role}`}
                                        onClick={handleCloseMenu}
                                    >
                                        Perfil
                                    </MenuItem>
                                    {user?.role == 0 &&
                                        <MenuItem
                                            component={Link}
                                            to={`/admin-list/${user?.role}`}
                                            onClick={handleCloseMenu}
                                        >
                                            Gerenciar
                                    </MenuItem>
                                    }
                                    <MenuItem onClick={handleOpenConfirmation}>Sair</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                    {confirmModal &&
                        <ConfimationModal
                            handleClose={handleCloseConfirmation}
                            open={confirmModal}
                            doDelete={handleLogout}
                            title='Deseja realmente sair?'
                        />
                    }
                    <SideBar
                        show={showSideBar}
                        change={changeSideBar}
                    />
                </div>
            }
        </>
    );
}

export default ToolbarWrap

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: '#343a40',
    },
    logo: {
        marginRight: 10,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
