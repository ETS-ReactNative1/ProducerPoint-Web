import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';

import api from '../../../services/api'
import { periods, ufs } from '../../../enums'

import { Area } from './styles'

const ProducerForm = () => {

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await api.createProducer(name, nickname, birthDate, phone, cpf, email, houseNumber, reference, averageCash,
            zipCode, city, district, uf, street, activity, resultList, period)

        if (response != null && response.status >= 200 && response.status <= 205) {
            console.log('Produtor gravado com sucesso.');
        } else {
            console.log('Erro inesperado, tente novamente ou contate o suporte. Status = ' + response.status);
        }
    }

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

    return (
        <Area>
            <div className='title--box'>
                <h3>Cadastro de Produtor</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='group--form'>
                    <TextField
                        className='name--form'
                        name='name'
                        label='Nome completo'
                        variant="outlined"
                        onChange={e => setName(e.target.value)}
                        required
                    />

                    <TextField
                        className='nickname--form'
                        name='nickname'
                        label='Apelido'
                        variant="outlined"
                        onChange={e => setNickname(e.target.value)}
                    />
                </div>

                <div className='group--form'>
                    <TextField
                        className='contact--form'
                        name='birth'
                        label='Nascimento'
                        variant="outlined"
                        onChange={e => setBirthDate(e.target.value)}
                        required
                    />

                    <TextField
                        className='contact--form'
                        name='cpf'
                        label='CPF/CNPJ'
                        variant="outlined"
                        onChange={e => setCpf(e.target.value)}
                        required
                    />

                    <TextField
                        className='contact--form'
                        name='phone'
                        label='Telefone'
                        variant="outlined"
                        onChange={e => setPhone(e.target.value)}
                        required
                    />

                    <TextField
                        className='email--form'
                        name='email'
                        label='E-mail'
                        variant="outlined"
                        onChange={e => setEmail(e.target.value)}
                    />

                </div>

                <div className='group--form'>
                    <TextField
                        className='zipcode--form'
                        name='zipcode'
                        label='CEP'
                        variant="outlined"
                        onChange={e => setZipCode(e.target.value)}
                        required
                    />

                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            label="Estado"
                            required
                        >
                            {ufs.map((i) =>
                                <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <TextField
                        className='citydist--form'
                        name='city'
                        label='Cidade'
                        variant="outlined"
                        onChange={e => setCity(e.target.value)}
                        required
                    />

                    <TextField
                        className='citydist--form'
                        name='district'
                        label='Bairro'
                        variant="outlined"
                        onChange={e => setDistrict(e.target.value)}
                        required
                    />

                </div>

                <div className='group--form'>
                    <TextField
                        className='citydist--form'
                        name='street'
                        label='Rua'
                        variant="outlined"
                        onChange={e => setStreet(e.target.value)}
                        required
                    />

                    <TextField
                        className='address--form'
                        name='house'
                        label='Nº'
                        variant="outlined"
                        onChange={e => setHouseNumber(e.target.value)}
                    />

                    <TextField
                        className='reference--form'
                        name='city'
                        label='Referência'
                        variant="outlined"
                        onChange={e => setReference(e.target.value)}
                    />

                </div>

                <div className='select--form'>
                    <FormControl className={classes.selectMulti}>
                        <InputLabel id="demo-mutiple-checkbox-label">Atividades Agrícolas</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            value={selectedActivities}
                            onChange={e => setSelectedActivities(e.target.value)}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            required
                        >
                            {activities.map((i) => (
                                <MenuItem key={i.value} value={i.label}>
                                    <Checkbox checked={selectedActivities.indexOf(i.label) > -1} />
                                    <ListItemText primary={i.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.select}>
                        <InputLabel id="demo-simple-select-outlined-label">Período</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={period}
                            onChange={e => setPeriod(e.target.value)}
                            required
                        >
                            {periods.map((i) =>
                                <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>

                <FormControl className={classes.multiProducts}>
                    <InputLabel id="demo-mutiple-checkbox-label">Selecione os Produtos</InputLabel>
                    <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={products}
                        onChange={e => setProducts(e.target.value)}
                        input={<Input />}
                        renderValue={(selected) => selected.join(', ')}
                        required
                    >
                        {productList.map((i) => (
                            <MenuItem key={i.value} value={i.label}>

                                <Checkbox checked={products.indexOf(i.label) > -1} />
                                <ListItemText primary={i.label} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="outlined">Cadastrar</Button>
            </form>

        </Area>
    );
}

export default ProducerForm

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 195,
    },
    selectMulti: {
        minWidth: 195,
        width: '70%'
    },
    select: {
        minWidth: 195,
        width: '28%'
    },
    multiProducts: {
        minWidth: 195,
        marginBottom: 20
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


