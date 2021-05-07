import React from 'react'

import { Container, Body } from '../../../components/MainStyles'
import { Area } from './styles'
import SideBar from '../../../components/SideBar'

import ProducerList from '../../../components/ProducerList'
import Footer from '../../../components/Footer'

const ProducerListPage = () => {

    return (
        <Container>
            <SideBar />
            <Body>
                <Area>
                    <ProducerList />
                </Area>
            </Body>
            <Footer />
        </Container>
    );
}

export default ProducerListPage