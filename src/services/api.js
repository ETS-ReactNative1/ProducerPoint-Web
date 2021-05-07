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
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getAllProducers ' + e)
        }
    },

    getProducerById: async (id) => {
        try {
            const request = await fetch(`${API}/producers/${id}`)
            const response = await request.json()
            console.log(response)
            return response
        } catch (e) {
            console.log('Erro: getProducerById ' + e)
        }
    },

    getAllProducts: async () => {
        try {
            const request = await fetch(`${API}/products`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getAllProducts ' + e)
        }
    },

}