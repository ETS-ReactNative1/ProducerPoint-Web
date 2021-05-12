import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";

import { AuthContext } from '../../contexts/AuthContext'
import logo from '../../assets/images/logo.png'
import { Area } from './styles'

import { isLogged, doLogout } from '../../services/auth'

const Header = ({ openSidebar }) => {

    const { user } = useContext(AuthContext)

    const logged = isLogged()

    const handleLogout = () => {
        doLogout()
        window.location.href = '/'
    }

    return (
        <Area>
            <div className='container'>
                <div className='nav'>
                    <Link to='#'>
                        <FaIcons.FaBars onClick={openSidebar} />
                    </Link>
                </div>
                <div className='logo-buttons'>
                    <div className='logo'>
                        <Link to='/home'>
                            <img className='logo-olx' src={logo} alt='logo olx' />
                        </Link>
                        <h3>Olá, {user?.name}</h3>
                    </div>

                    <nav>
                        <ul>
                            {logged
                                && <>
                                    <li>
                                        <Link to='/my-account'>Minha Conta</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}>Sair</button>
                                    </li>
                                </>
                            }
                        </ul>
                    </nav>
                </div>
            </div>

        </Area >
    );
}

export default Header