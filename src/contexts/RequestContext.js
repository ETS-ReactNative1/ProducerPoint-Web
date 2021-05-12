import React, { useState, useEffect, createContext } from 'react'

import api from '../services/api'

export const RequestContext = createContext({})

const RequestProvider = ({ children }) => {

    const [producers, setProducers] = useState([])
    const [products, setProducts] = useState([])
    const [activities, setActivities] = useState([])

    const loadProducers = async () => {
        const request = await api.getAllProducers()
        const response = await request.json()
        setProducers(response)
    }

    const loadProducts = async () => {
        const request = await api.getAllProducts()
        const response = await request.json()
        setProducts(response)
    }

    const loadActivities = async () => {
        const request = await api.getAllActivities()
        const response = await request.json()
        setActivities(response)
    }

    useEffect(() => {
        loadProducers()
        loadProducts()
        loadActivities()
    }, [])

    return (
        <RequestContext.Provider value={{
            producers, loadProducers,
            products, loadProducts,
            activities, loadActivities
        }}>
            {children}
        </RequestContext.Provider>
    )
}

export default RequestProvider

