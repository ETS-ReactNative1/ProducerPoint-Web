import React, { useState, useEffect } from 'react'

import api from '../../../services/api'

import { Container, Body } from '../../../components/MainStyles'
import { Area } from './styles'

import ProducerList from '../../../components/ProducerList'

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
            <Body>
                <Area>
                    <ProducerList 
                    data={producers}
                    title={'Lista de Produtores'}
                    />
                </Area>
            </Body>
        </Container>
    );
}

export default ProducerListPage