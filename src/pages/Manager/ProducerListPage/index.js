import React, { useState, useEffect } from 'react'

import api from '../../../services/api'
import ProducerList from '../../../components/ProducerList'

import { Area } from './styles'

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
        <Area>
            <ProducerList
                data={producers}
                title={'Lista de Produtores'}
            />
        </Area>
    );
}

export default ProducerListPage