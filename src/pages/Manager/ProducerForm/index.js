import React from 'react'

import { Container, Body } from '../../../components/MainStyles'
import { Area } from './styles'
import SideBar from '../../../components/SideBar'

const ProducerForm = () => {
    return (
        <Container>
            <SideBar />
            <Body>
                <Area>ProducerForm</Area>
            </Body>
        </Container>
    );
}

export default ProducerForm
