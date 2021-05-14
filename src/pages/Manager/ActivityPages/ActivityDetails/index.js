import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../../../services/api'
import ProducersList from '../../../../components/ProducersList'

import { Area } from './styles'

const ActivityDetails = () => {

    const { id } = useParams()

    const [producers, setProducers] = useState([])
    const [activity, setActivity] = useState([])

    useEffect(() => {
        const getActivity = async (id) => {
            const request = await api.getActivityById(id)
            const response = await request.json();
            setActivity(response)
        }
        getActivity(id)
    }, [])

    useEffect(() => {
        const getProducersByActivity = async (id) => {
            const request = await api.getProducersByActivity(id)
            const response = await request.json();
            setProducers(response)
        }
        getProducersByActivity(id)
    }, [])

    return (
        <Area>
            <ProducersList
                data={producers}
                title={`Todos da Categoria: ${activity?.label}`}
            />
        </Area>
    );
}

export default ActivityDetails
