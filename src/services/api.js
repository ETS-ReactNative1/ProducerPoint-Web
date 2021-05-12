const API = 'https://apiproducers.serviceapp.net.br/api'
//const API = 'http://192.168.1.128:8080/api'
//const API = 'https://producersapi.herokuapp.com/api'

export default {

    onSignIn: async (email, password) => {
        try {
            const request = await fetch(`${API}/signin`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            return request

        } catch (e) {
            console.log('Error: onSignIn ' + e)
        }
    },

    getAllProducers: async () => {
        try {
            const request = await fetch(`${API}/producers`)
            return request
        } catch (e) {
            console.log('Erro: getAllProducers ' + e)
        }
    },

    getProducerById: async (id) => {
        try {
            const request = await fetch(`${API}/producers/${id}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getProducerById ' + e)
        }
    },

    createProducer: async (
        name, nickname, birthDate, cpf, phone, email, zipCode,
        uf, city, district, street, houseNumber, reference,
        activity, period, averageCash, products, userId
    ) => {

        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                name: name,
                nickname: nickname,
                birthDate: birthDate,
                cpf: cpf,
                phone: phone,
                email: email,
                address: {
                    zipCode: zipCode,
                    uf: uf,
                    city: city,
                    district: district,
                    street: street,
                    houseNumber: houseNumber,
                    reference: reference,
                },
                farmingActivity: {
                    activityName: {
                        value: activity
                    },
                    period: period,
                    averageCash: parseFloat(averageCash)
                },
                products: products,
                manager: {
                    id: userId,
                },
            }

            const request = await fetch(`${API}/producers`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request
        } catch (e) {
            console.log('Erro: createProducer ' + e)
        }
    },

    updateProducer: async (
        id, name, nickname, birthDate, cpf, phone, email, zipCode,
        uf, city, district, street, houseNumber, reference,
        activity, period, averageCash, products, userId
    ) => {

        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                name: name,
                nickname: nickname,
                birthDate: birthDate,
                cpf: cpf,
                phone: phone,
                email: email,
                address: {
                    zipCode: zipCode,
                    uf: uf,
                    city: city,
                    district: district,
                    street: street,
                    houseNumber: houseNumber,
                    reference: reference,
                },
                farmingActivity: {
                    activityName: {
                        value: activity
                    },
                    period: period,
                    averageCash: parseFloat(averageCash)
                },
                products: products,
                manager: {
                    id: userId,
                },
            }

            const request = await fetch(`${API}/producers/${id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request
        } catch (e) {
            console.log('Erro: createProducer ' + e)
        }
    },

    deleteProducer: async (id) => {
        try {
            const request = await fetch(`${API}/producers/${id}`, { method: 'DELETE' })
            return request
        } catch (e) {
            console.log('Erro: deleteProducer ' + e)
        }
    },

    getAllProducts: async () => {
        try {
            const request = await fetch(`${API}/products`)
            return request
        } catch (e) {
            console.log('Erro: getAllProducts ' + e)
        }
    },

    getProductById: async (id) => {
        try {
            const request = await fetch(`${API}/products/${id}`)
            return request
        } catch (e) {
            console.log('Erro: getProductById ' + e)
        }
    },

    getProducersByProduct: async (id) => {
        try {
            const request = await fetch(`${API}/products/${id}/producers`)
            return request
        } catch (e) {
            console.log('Erro: getProducersByProduct ' + e)
        }
    },

    getProducersByActivity: async (activityName) => {
        try {
            const request = await fetch(`${API}/producers/byactivity/${activityName}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            return request
        } catch (e) {
            console.log('Erro: getProducersByActivity ' + e)
        }
    },

    getAllActivities: async () => {
        try {
            const request = await fetch(`${API}/activities`)
            return request
        } catch (e) {
            console.log('Erro: getAllActivities ' + e)
        }
    },

}