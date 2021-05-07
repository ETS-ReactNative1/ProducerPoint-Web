import React from 'react'

import { Container, Body } from '../../../components/MainStyles'
import { Area } from './styles'
import SideBar from '../../../components/SideBar'

import ProducerList from '../../../components/ProducerList'

const ManagerHome = () => {

    return (
        <Container>
            <SideBar />
            <Body>
                <Area>
                    <ProducerList />
                </Area>
            </Body>
        </Container>
    );
}

export default ManagerHome