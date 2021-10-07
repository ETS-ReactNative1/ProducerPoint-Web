import React, { useState, useEffect } from 'react'

import api from '../../../../services/api'
import SitesList from '../../../../components/SitesList'

import { Area } from './styles'

const SiteList = () => {

    const [sites, setSites] = useState([])

    useEffect(() => {
        const getSites = async () => {
            const response = await api.getAllSites()
            setSites(response.data)
        }
        getSites()
    }, [])

    return (
        <Area>
            <SitesList
                data={sites}
                title={'Lista de Produtores'}
                isButton={true}
            />
        </Area>
    );
}

export default SiteList