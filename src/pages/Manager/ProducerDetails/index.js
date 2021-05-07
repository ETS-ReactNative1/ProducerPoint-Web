import React from 'react'

import { Container, Body } from '../../../components/MainStyles'
import { Area } from './styles'
import SideBar from '../../../components/SideBar'

const ProducerDetails = () => {
    return (
        <Container>
            <SideBar />
            <Body>
                <Area>ProducerDetails</Area>
            </Body>
        </Container>
    );
}

export default ProducerDetails
