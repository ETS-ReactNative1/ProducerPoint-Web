import moment from 'moment'

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

    createProduct: async (label) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = { label: label }

            const request = await fetch(`${API}/products`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request
        } catch (e) {
            console.log('Erro: createProduct ' + e)
        }
    },

    updateProduct: async (id, label) => {
        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                value: id,
                label: label
            }

            const request = await fetch(`${API}/products/${id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request
        } catch (e) {
            console.log('Erro: updateProduct ' + e)
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

    deleteProduct: async (id) => {
        try {
            const request = await fetch(`${API}/products/${id}`, { method: 'DELETE' })
            return request
        } catch (e) {
            console.log('Erro: deleteProduct ' + e)
        }
    },

    createActivity: async (label) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = { label: label }

            const request = await fetch(`${API}/activities`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request
        } catch (e) {
            console.log('Erro: createProduct ' + e)
        }
    },

    updateActivity: async (id, label) => {
        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                value: id,
                label: label
            }

            const request = await fetch(`${API}/activities/${id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request
        } catch (e) {
            console.log('Erro: updateActivity ' + e)
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

    getActivityById: async (id) => {
        try {
            const request = await fetch(`${API}/activities/${id}`)
            return request
        } catch (e) {
            console.log('Erro: getProductById ' + e)
        }
    },

    getProducersByActivity: async (id) => {
        try {
            const request = await fetch(`${API}/producers/findByActivity/${id}`)
            return request
        } catch (e) {
            console.log('Erro: getProducersByActivity ' + e)
        }
    },

    deleteActivity: async (id) => {
        try {
            const request = await fetch(`${API}/activities/${id}`, { method: 'DELETE' })
            return request
        } catch (e) {
            console.log('Erro: deleteProduct ' + e)
        }
    },

    createTask: async (description, date, id) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const formatDate = moment(date).format('yyyy/MM/DD')

            const data = {
                description: description,
                status: false,
                date: formatDate,
                manager: {
                    id: id,
                },
            }

            const request = await fetch(`${API}/tasks`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request
        } catch (e) {
            console.log('Erro: createTask ' + e)
        }
    },

    getAllTasks: async () => {
        try {
            const request = await fetch(`${API}/tasks`)
            return request
        } catch (e) {
            console.log('Erro: getAllTasks ' + e)
        }
    },

    getAllTodayTasks: async () => {
        try {
            const request = await fetch(`${API}/tasks/todaytasks`) || []
            return request
        } catch (e) {
            console.log('Erro: getAllTodayTasks ' + e)
        }
    },

    getAllFutureTasks: async () => {
        try {
            const request = await fetch(`${API}/tasks/futuretasks`) || []
            return request
        } catch (e) {
            console.log('Erro: getAllFutureTasks ' + e)
        }
    },

    setStateTasks: async (id, status) => {
        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = { status: status }

            const request = await fetch(`${API}/tasks/${id}`,
                {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(data)
                }
            )
            return request
        } catch (e) {
            console.log('Erro: setStateTasks ' + e)
        }
    },

    deleteTask: async (id) => {
        try {
            const request = await fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
            return request
        } catch (e) {
            console.log('Erro: deleteTask ' + e)
        }
    },

}