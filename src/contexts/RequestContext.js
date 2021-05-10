import React, { useState, useEffect, createContext } from 'react'

import api from '../services/api'

export const RequestContext = createContext({})

const RequestProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [producers, setProducers] = useState([])
    const [products, setProducts] = useState([])

    const loadProducers = async () => {
        setLoading(true)
        const response = await api.getAllProducers()
        setProducers(response)
        setLoading(false)
    }

    const loadProducts = async () => {
        setLoading(true)
        const response = await api.getAllProducts()
        setProducts(response)
        setLoading(false)
    }

    useEffect(() => {
        loadProducers()
        loadProducts()
    }, [])

    return (
        <RequestContext.Provider value={{
            loading, setLoading,
            producers, loadProducers,
            products, loadProducts,
        }}>
            {children}
        </RequestContext.Provider>
    )
}

export default RequestProvider

