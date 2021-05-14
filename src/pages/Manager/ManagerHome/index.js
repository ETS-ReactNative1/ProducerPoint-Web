import React, { useState, useEffect } from 'react'

import api from '../../../services/api'

import ProducersList from '../../../components/ProducersList'

import { Area } from './styles'

const ManagerHome = () => {

    const [producers, setProducers] = useState([])

    useEffect(() => {
        const getProducers = async () => {
            const request = await api.getAllProducers()
            const response = await request.json()
            setProducers(response)
        }
        getProducers()
    }, [])

    return (
        <Area>
            <ProducersList
                data={producers}
                title={'Lista de Produtores'}
            />
        </Area>
    );
}

export default ManagerHome