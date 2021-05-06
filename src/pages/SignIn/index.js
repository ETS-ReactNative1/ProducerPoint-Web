import React, { useState, useContext } from 'react'

import logo from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/AuthContext'

import { ErrorMessage } from '../../components/MainStyles'
import { Area, Container, Background } from './styles'

const SignIn = () => {

    const { signIn } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPassword, setRememberPassword] = useState(false)

    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault() // Para que o formulário não seja enviado sem querer
        setDisabled(true)
        setError('')

        await signIn(email.trim(), password.trim())

        setDisabled(false)
    }

    return (
        <Container>
            <Background />
            <Area>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <div className='area--logo'>
                    <img src={logo} alt='' />
                </div>
                <div className='title' alt=''>producer point</div>
                Realize sua autenticação
                <form onSubmit={handleSubmit}>
                    <label className='area'>
                        <div className='area--title'>E-mail:</div>
                        <div className='area--input'>
                            <input
                                type='email'
                                placeholder='Digite seu e-mail'
                                disabled={disabled}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'>Senha:</div>
                        <div className='area--input'>
                            <input
                                type='password'
                                placeholder='Digite sua senha'
                                disabled={disabled}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title-checkbox'>
                            <div className='area--title'>Lembrar Senha:</div>
                            <div className='area--input'>
                                <input
                                    className='area--checkbox'
                                    type='checkbox'
                                    disabled={disabled}
                                    checked={rememberPassword}
                                    onChange={() => setRememberPassword(!rememberPassword)}
                                />
                            </div>
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area--title'></div>
                        <div className='area--input'>
                            <button disabled={disabled}>Entrar</button>
                        </div>
                    </label>
                </form>
            </Area>
        </Container>
    );
}

export default SignIn