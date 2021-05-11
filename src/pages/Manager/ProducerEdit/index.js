import React, { useState, useEffect } from 'react'
import { useFormik, Form } from 'formik'
import * as yup from 'yup'

//https://www.youtube.com/watch?v=MV9NC3FoCmM

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, Container, TextField, Button, MenuItem, Select,
    Input, InputLabel, ListItemText, Checkbox
} from '@material-ui/core';

import api from '../../../services/api'
import { periods, ufs } from '../../../enums'

import { Area } from './styles'

const ProducerEdit = () => {

    const classes = useStyles();
    const [activities, setActivities] = useState([]);
    const [products, setProducts] = useState([]);
    const [productList, setProductList] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [period, setPeriod] = useState('Mensal');

    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [birthDate, setBirthDate] = useState(Date());

    // Address
    const [zipCode, setZipCode] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [street, setStreet] = useState('')
    const [uf, setUf] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [reference, setReference] = useState('')
    const [averageCash, setAverageCash] = useState();
    const [activity, setActivity] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            const request = await api.getAllProducts()
            const response = await request.json();
            setProductList(response);
        }

        getProducts()
    }, [])

    useEffect(() => {
        const getActivities = async () => {
            const request = await api.getAllActivities()
            const response = await request.json();
            setActivities(response);
        }

        getActivities()
    }, [])

    const productsList = () => {
        const newArray = []
        for (let i of productList) {
            const values = Object.values(i)
            for (let j of products) {
                if (values[1] === j) {
                    const obj = { value: values[0] }
                    newArray.push(obj)
                }
            }
        }
        return newArray
    }

    const resultList = productsList()

    const initialFormState = {
        name: '',
        nickname: '',
        birthDate: '',
        cpf: '',
        phone: '',
        email: '',
        address: {
            zipCode: '',
            uf: '',
            city: '',
            district: '',
            street: '',
            houseNumber: '',
            reference: ''
        },
        farmingActivity: {
            activityName: {
                value: ''
            },
            averageCash: '',
            period: ''
        },
        products: [],
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required('Nome é obrigatório!'),
        birthDate: yup.date().required('Data de nascimento é obrigatória!'),
        cpf: yup.string().required('CPF é obrigatório!'),
        email: yup.string().email('E-mail inválido!'),
        address: yup.object().shape({
            zipCode: yup.string().required('CEP é obrigatório!'),
            uf: yup.string().required('Estado é obrigatório!'),
            city: yup.string().required('Cidade é obrigatória!'),
            district: yup.string().required('Bairro é obrigatório!'),
            street: yup.string().required('Rua é obrigatória!'),
        }),
        farmingActivity: yup.object().shape({
            activityName: yup.object().shape({
                value: yup.string().required('Atividade é obrigatório!')
            }),
            period: yup.string().required('Atividade é obrigatório!'),
        }),
        products: yup.array().required('Produto é obrigatório!'),
    })

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: (values) => {

            console.log(values)
        }
    })

    return (
        <Area>
            <div className='title--box'>
                <h3>Cadastro de Produtor</h3>
            </div>
            <Grid container>
                <Grid item xs={12}>
                    <Container maxWidth='md'>
                        <div className={classes.formWrapper}>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>

                                    <Grid item xs={9}>
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
                                            id="nickname"
                                            name="nickname"
                                            label="Apelido"
                                            value={formik.values.nickname}
                                            onChange={formik.handleChange}
                                            error={formik.touched.nickname && Boolean(formik.errors.nickname)}
                                            helperText={formik.touched.nickname && formik.errors.nickname}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="birthDate"
                                            name="birthDate"
                                            label="Nascimento"
                                            type="date"
                                            value={formik.values.birthDate}
                                            onChange={formik.handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                                            helperText={formik.touched.birthDate && formik.errors.birthDate}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="cpf"
                                            name="cpf"
                                            label="CPF"
                                            value={formik.values.cpf}
                                            onChange={formik.handleChange}
                                            error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                                            helperText={formik.touched.cpf && formik.errors.cpf}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="phone"
                                            name="phone"
                                            label="Telefone"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                                            helperText={formik.touched.phone && formik.errors.phone}
                                        />
                                    </Grid>

                                    <Grid item xs={5}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="email"
                                            name="email"
                                            label="E-mail"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="zipCode"
                                            name="address.zipCode"
                                            label="CEP"
                                            value={formik.values.address.zipCode}
                                            onChange={formik.handleChange}
                                            error={formik.touched.address?.zipCode && Boolean(formik.errors.address?.zipCode)}
                                            helperText={formik.touched.address?.zipCode && formik.errors.address?.zipCode}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="uf"
                                            name="address.uf"
                                            value={formik.values.address.uf}
                                            onChange={formik.handleChange}
                                            label="Estado"
                                            error={formik.touched.address?.uf && Boolean(formik.errors.address?.uf)}
                                            helperText={formik.touched.address?.uf && formik.errors.address?.uf}
                                            select
                                            required
                                        >
                                            {ufs.map((i) =>
                                                <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                                            )}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="city"
                                            name="address.city"
                                            label="Cidade"
                                            value={formik.values.address.city}
                                            onChange={formik.handleChange}
                                            error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
                                            helperText={formik.touched.address?.city && formik.errors.address?.city}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="district"
                                            name="address.district"
                                            label="Bairro"
                                            value={formik.values.address.district}
                                            onChange={formik.handleChange}
                                            error={formik.touched.address?.district && Boolean(formik.errors.address?.district)}
                                            helperText={formik.touched.address?.district && formik.errors.address?.district}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="street"
                                            name="address.street"
                                            label="Rua"
                                            value={formik.values.address.street}
                                            onChange={formik.handleChange}
                                            error={formik.touched.address?.street && Boolean(formik.errors.address?.street)}
                                            helperText={formik.touched.address?.street && formik.errors.address?.street}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="houseNumber"
                                            name="address.houseNumber"
                                            label="Nº"
                                            value={formik.values.address.houseNumber}
                                            onChange={formik.handleChange}
                                            error={formik.touched.address?.houseNumber && Boolean(formik.errors.address?.houseNumber)}
                                            helperText={formik.touched.address?.houseNumber && formik.errors.address?.houseNumber}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="reference"
                                            name="address.reference"
                                            label="Referência"
                                            value={formik.values.address.reference}
                                            onChange={formik.handleChange}
                                            error={formik.touched.address?.reference && Boolean(formik.errors.address?.reference)}
                                            helperText={formik.touched.address?.reference && formik.errors.address?.reference}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="activityName"
                                            name="farmingActivity.activityName.value"
                                            label="Atividade Agrícola"
                                            value={formik.values.farmingActivity.activityName?.value}
                                            error={formik.touched.farmingActivity?.activityName?.value && Boolean(formik.errors.farmingActivity?.activityName?.value)}
                                            helperText={formik.touched.farmingActivity?.activityName?.value && formik.errors.farmingActivity?.activityName?.value}
                                            onChange={formik.handleChange}
                                            select
                                        >
                                            {activities.map((i) =>
                                                <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                                            )}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="activityName"
                                            name="farmingActivity.period"
                                            label="Atividade Agrícola"
                                            value={formik.values.farmingActivity?.period}
                                            onChange={formik.handleChange}
                                            error={formik.touched.farmingActivity?.period && Boolean(formik.errors.farmingActivity?.period)}
                                            helperText={formik.touched.farmingActivity?.period && formik.errors.farmingActivity?.period}
                                            select
                                        >
                                            {periods.map((i) =>
                                                <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                                            )}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            id="averageCash"
                                            name="farmingActivity.averageCash"
                                            label="Renda"
                                            value={formik.values.farmingActivity?.averageCash}
                                            onChange={formik.handleChange}
                                            required
                                            error={formik.touched.farmingActivity?.averageCash && Boolean(formik.errors.farmingActivity?.averageCash)}
                                            helperText={formik.touched.farmingActivity?.averageCash && formik.errors.farmingActivity?.averageCash}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputLabel id="demo-mutiple-checkbox-label">Selecione pelo menos um produto</InputLabel>
                                        <Select
                                            id="products"
                                            name="products"
                                            label="Selecione os Produtos"
                                            multiple
                                            value={formik.values.products}
                                            onChange={formik.handleChange}
                                            input={<Input />}
                                            renderValue={(selected) => selected.join(', ')}
                                            error={formik.touched.products && Boolean(formik.errors.products)}
                                            helperText={formik.touched.products && formik.errors.products}
                                            fullWidth
                                            required
                                        >
                                            {productList.map((i) => (
                                                <MenuItem key={i.value} value={i.label}>
                                                    <Checkbox checked={formik.values.products.indexOf(i.label) > -1} />
                                                    <ListItemText primary={i.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>

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

                            </form>
                        </div>
                    </Container>
                </Grid>

            </Grid>
        </Area >
    );
}

export default ProducerEdit

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(8),

    },
    button: {
        marginTop: 20
    }
}));


