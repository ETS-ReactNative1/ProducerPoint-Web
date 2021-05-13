import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { makeStyles, Grid, TextField, Button } from '@material-ui/core';

import api from '../../../services/api'

const ActivityForm = () => {

    const [loading, setLoading] = useState(false)
    const classes = useStyles()

    const validationSchema = yup.object().shape({
        label: yup.string().required('Nome da atividade é obrigatória!'),
    })

    const formik = useFormik({
        initialValues: { label: '' },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            const response = await api.createActivity(values.label)

            if (response && response.status >= 200 && response.status <= 205) {
                alert('Produto salvo!')
                window.location.href = '/activity-list'
            } else {
                alert('Erro inesperado, tente novamente ou contate o suporte. Status = ' + response.status);
            }
        }
    })

    return (
        <>
            <div className={classes.titleBox}>
                <h3 className={classes.title}>Cadastrar Atividade</h3>
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
                                        Cadastrar
                                    </Button>
                                </Grid>

                            </Grid>

                        </form>
                    </div>
                </Grid>

            </Grid>
        </ >
    );
}

export default ActivityForm

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(8),
    },
    button: {
        backgroundColor: '#007200',

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


