import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../../services/api'

import ProducerList from '../../../components/ProducerList'

import { Area } from './styles'

const ActivityDetails = () => {

    const { id } = useParams()

    const [producers, setProducers] = useState([])

    useEffect(() => {
        const getProducersByProduct = async (id) => {
            const request = await api.getProducersByProduct(id)
            const response = await request.json();
            setProducers(response)
        }
        getProducersByProduct(id)
    }, [])

    return (
        <Area>
            <ProducerList
                data={producers}
                title={`Produtores de ${null}`}
            />
        </Area>
    );
}

export default ActivityDetails
