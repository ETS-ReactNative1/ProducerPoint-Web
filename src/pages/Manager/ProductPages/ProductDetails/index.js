import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../../../services/api'
import ProducersList from '../../../../components/ProducersList'

import { Area } from './styles'

const ProductDetails = () => {

    const { id } = useParams()

    const [producers, setProducers] = useState([])
    const [product, setProduct] = useState([])

    useEffect(() => {
        const getProduct = async (id) => {
            const request = await api.getProductById(id)
            const response = await request.json();
            setProduct(response)
        }
        getProduct(id)
    }, [])

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
            <ProducersList
                data={producers}
                title={`Produtores de ${product?.label}`}
            />
        </Area>
    );
}

export default ProductDetails
