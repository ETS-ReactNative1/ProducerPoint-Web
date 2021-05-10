import React, { useState, useEffect } from 'react'

import api from '../../../services/api'

import ProducerList from '../../../components/ProducerList'

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
            <ProducerList
                data={producers}
                title={'Lista de Produtores'}
            />
        </Area>
    );
}

export default ManagerHome