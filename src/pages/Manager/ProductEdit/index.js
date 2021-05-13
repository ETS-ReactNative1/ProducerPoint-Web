import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { makeStyles, Grid, TextField, Button } from '@material-ui/core'

import api from '../../../services/api'

const ProductEdit = () => {

    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const classes = useStyles();

    useEffect(() => {
        const getProductById = async (id) => {
            const request = await api.getProductById(id)
            const response = await request.json()
            formik.setFieldValue('label', response.label)
        }
        getProductById(id)
    }, [])


    const validationSchema = yup.object().shape({
        label: yup.string().required('Nome é obrigatório!'),
    })

    const formik = useFormik({
        initialValues: { label: '' },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            const response = await api.updateProduct(id, values.label)

            if (response && response.status >= 200 && response.status <= 205) {
                alert('Produtor atualizado!!')
                window.location.href = '/product-list'
            } else {
                alert('Erro inesperado, tente novamente ou contate o suporte. Status = ' + response.status);
            }
        }
    })

    return (
        <>
            <div className={classes.titleBox}>
                <h3 className={classes.title}>Editar Produto</h3>
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
                                        label="Nome do produto"
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
        </ >
    );
}

export default ProductEdit

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


