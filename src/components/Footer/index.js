import React from 'react'
import { useLocation } from 'react-router-dom'

import { Container } from './styles'

const Footer = () => {

    const location = useLocation()

    return (
        <>
            {location.pathname !== '/' &&
                < Container >
                    Todos os direitos reservados aos criadores do Producer Point - 2021 < br />
                </Container >
            }
        </>
    );
}

export default Footer