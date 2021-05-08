import React, { useState, useEffect } from 'react'

import api from '../../../services/api'

import { Container, Body } from '../../../components/MainStyles'
import { Area } from './styles'
import SideBar from '../../../components/SideBar'

import ProducerList from '../../../components/ProducerList'
import Footer from '../../../components/Footer'

const ProducerListPage = () => {

    const [producers, setProducers] = useState([])

    useEffect(() => {
        const getProducers = async () => {
            const response = await api.getAllProducers()
            setProducers(response)
        }
        getProducers()
    }, [])

    return (
        <Container>
            <SideBar />
            <Body>
                <Area>
                    <ProducerList 
                    data={producers}
                    title={'Lista de Produtores'}
                    />
                </Area>
            </Body>
            <Footer />
        </Container>
    );
}

export default ProducerListPage