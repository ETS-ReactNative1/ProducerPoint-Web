import React, { useState, useEffect, createContext } from 'react'
import Cookies from 'js-cookie'

import Api from '../services/api'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [loadingAuth, setLoadingAuth] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loadStorage = () => {
            const storageUser = Cookies.get('@producerpoint:user')
            if (storageUser) {
                setUser(JSON.parse(storageUser))
            }
        }
        loadStorage()
    }, [])

    const signIn = async (email, password) => {

        setLoadingAuth(true)
        if (email.length === 0 || password.length === 0) {
            setLoadingAuth(false)
            return
        } else {
            const response = await Api.onSignIn(email, password)

            try {
                if (response.data) {
                    setUser(response.data)
                    storageUser(response.data)
                    window.location.href = '/home'
                    setLoadingAuth(false)
                    return
                } else {
                    alert('Erro inesperado!' + response.status)
                    setLoadingAuth(false)
                    return
                }
            }
            catch (erro) {
                alert('Error: ' + erro)
                setLoadingAuth(false)
            }
        }
    }

    //Função para adicionar o usuário no Async Storage
    const storageUser = async (data) => {
        Cookies.set('@producerpoint:user', data, { expires: 999 })
        //await AsyncStorage.setItem('@producerpoint:user', JSON.stringify(data))
    }

    return (

        <AuthContext.Provider value={{
            user, loadingAuth, signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
