import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, TextField, Button, MenuItem, Select,
    Input, InputLabel, ListItemText, Checkbox,
} from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply'

import api from '../../../../services/api'
import { RequestContext } from '../../../../contexts/RequestContext'
import { AuthContext } from '../../../../contexts/AuthContext'
import { ufs } from '../../../../enums'
import { formatarCEP, phoneMask } from '../../../../components/Helpers'

import WarningModal from '../../../../components/Modals/WarningModal'
import Success from '../../../../assets/lotties/success.json'
import Fail from '../../../../assets/lotties/fail.json'

const SiteEdit = () => {

    const history = useHistory()
    const { sites } = useContext(RequestContext)
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const classes = useStyles()

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    useEffect(() => {
        const getSiteById = async (id) => {
            const response = await api.getSiteById(id)
            const { data } = response

            formik.setFieldValue('name', data?.name)
            formik.setFieldValue('producer', data?.producer)
            
        }

        if(!!id) {
            getSiteById(id)
        }
    }, [])

    const initialFormState = {
        name: '',
        producer: {},
        rains : []
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required('Nome é obrigatório!'),
        producer: yup.array().min(1, 'Selecione um produto!r')
    })

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (name, producer) => {

            const response = !!id ? 
            await api.updateSite(id, name, producer?.id)
            :
            await api.createSite(name, prodducer?.id)
            

            if (response.data) {
                setLottie(Success)
                setMessage('Sítio atualizado com sucesso!')
                handleOpenWarningModal()
                setTimeout(() => {
                    window.location.href = '/site-list'
                }, 2500);
            } else {
                setLottie(Fail)
                setMessage(`Falha inesperada! Erro: ${response.status}`)
                handleOpenWarningModal()
            }
        }
    })

    return (
        <>
            <div className={classes.titleBox}>
                <h3 className={classes.title}>
                    {!!id ? 'Editar' : 'Cadastrar'} Sítio
                </h3>
            </div>
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.formWrapper}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>

                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="name"
                                        name="name"
                                        label="Nome"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="producer"
                                        name="producer"
                                        value={formik.values.producer.id}
                                        onChange={formik.handleChange}
                                        label="Produtor"
                                        error={formik.touched?.producer && Boolean(formik.errors.producer)}
                                        helperText={formik.touched.producer && formik.errors.producer}
                                        select
                                        required
                                    >
                                        {ufs.map((i) =>
                                            <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                                        )}
                                    </TextField>
                                </Grid>

                            </Grid>

                        </form>
                    </div>
                </Grid>

            </Grid>
            {warningModal &&
                <WarningModal
                    handleClose={handleCloseWarningModal}
                    open={warningModal}
                    message={message}
                    lottie={lottie}
                />
            }
        </ >
    );
}

export default SiteEdit

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(8),

    },
    button: {
        backgroundColor: '#070',
        width: '100%',
        '&:hover': {
            background: '#005200'
        },
    },
    buttonBack: {
        margin: 2,
        backgroundColor: '#458CB8',
        width: '100%',
        '&:hover': {
            background: '#33617D'
        },
    },
    titleBox: {
        height: 50,
        backgroundColor: '#ccc',
        paddingRight: 10,
        paddingLeft: 10,
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: 'space-between',
        display: 'flex'

    },
    title: {
        fontSize: 18,
        textTransform: 'uppercase'
    }

}));


