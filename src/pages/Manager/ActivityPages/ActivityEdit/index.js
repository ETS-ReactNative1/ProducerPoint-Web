import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { makeStyles, Grid, TextField, Button } from '@material-ui/core'
import api from '../../../../services/api'

import WarningModal from '../../../../components/Modals/WarningModal'
import Success from '../../../../assets/lotties/success.json'
import Fail from '../../../../assets/lotties/fail.json'

const ActivityEdit = () => {

    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const classes = useStyles()

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    useEffect(() => {
        const getActivityById = async (id) => {
            const response = await api.getActivityById(id)
            formik.setFieldValue('label', response.data.label)
        }
        getActivityById(id)
    }, [])


    const validationSchema = yup.object().shape({
        label: yup.string().required('Nome é obrigatório!'),
    })

    const formik = useFormik({
        initialValues: { label: '' },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            const response = await api.updateActivity(id, values.label)

            if (response.data) {
                setLottie(Success)
                setMessage('Atividade atualizada com sucesso!')
                handleOpenWarningModal()
                setTimeout(() => {
                    window.location.href = '/activity-list'
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
                <h3 className={classes.title}>Editar Atividade</h3>
            </div>
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.formWrapper}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="label"
                                        name="label"
                                        label="Nome da atividade"
                                        value={formik.values.label}
                                        onChange={formik.handleChange}
                                        error={formik.touched.label && Boolean(formik.errors.label)}
                                        helperText={formik.touched.label && formik.errors.label}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        onClick={formik.handleSubmit}
                                        className={classes.button}
                                        color="primary"
                                        variant="contained"
                                        fullWidth
                                        type="submit">
                                        Salvar
                                        </Button>
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

export default ActivityEdit

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(8),

    },
    button: {
        backgroundColor: '#070',

        '&:hover': {
            background: '#005200'
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


