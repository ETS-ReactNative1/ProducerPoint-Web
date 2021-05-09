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
    const [uf, setUf] = useState('');
    const [activities, setActivities] = useState([]);
    const [products, setProducts] = useState([]);
    const [productList, setProductList] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [period, setPeriod] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            const request = await api.getAllProducts()
            const response = await request.json();
            setProductList(response);
        }

        getProducts()
    }, [])

    console.log(products)


    useEffect(() => {
        const getActivities = async () => {
            const request = await api.getAllActivities()
            const response = await request.json();
            setActivities(response);
        }

        getActivities()
    }, [])

    const handleChangeUf = (event) => {
        setUf(event.target.value);
    };

    const handleChangePeriod = (event) => {
        setPeriod(event.target.value);
    };

    const handleChangeActivities = (event) => {
        setSelectedActivities(event.target.value);
    };

    const handleChangeProducts = (event) => {
        setProducts(event.target.value);
    };

    const productsList = () => {
        const newArray = []
        for (let i of products) {
            const keys = Object.keys(i)
            for (let key of keys) {
                if (key === 'value') {
                    const obj = { value: i[key] }
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
            <form>
                <div className='group--form'>
                    <TextField
                        className='name--form'
                        name='name'
                        label='Nome completo'
                        variant="outlined"
                        required
                    />

                    <TextField
                        className='nickname--form'
                        name='nickname'
                        label='Apelido'
                        variant="outlined"
                    />
                </div>

                <div className='group--form'>
                    <TextField
                        className='contact--form'
                        name='birth'
                        label='Nascimento'
                        variant="outlined"
                        required
                    />

                    <TextField
                        className='contact--form'
                        name='cpf'
                        label='CPF/CNPJ'
                        variant="outlined"
                        required
                    />

                    <TextField
                        className='contact--form'
                        name='phone'
                        label='Telefone'
                        variant="outlined"
                        required
                    />

                    <TextField
                        className='email--form'
                        name='email'
                        label='E-mail'
                        variant="outlined"
                    />

                </div>

                <div className='group--form'>
                    <TextField
                        className='zipcode--form'
                        name='zipcode'
                        label='CEP'
                        variant="outlined"
                        required
                    />

                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={uf}
                            onChange={handleChangeUf}
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
                        required
                    />

                    <TextField
                        className='citydist--form'
                        name='district'
                        label='Bairro'
                        variant="outlined"
                        required
                    />

                </div>

                <div className='group--form'>
                    <TextField
                        className='citydist--form'
                        name='street'
                        label='Rua'
                        variant="outlined"
                        required
                    />

                    <TextField
                        className='address--form'
                        name='house'
                        label='Nº'
                        variant="outlined"
                    />

                    <TextField
                        className='reference--form'
                        name='city'
                        label='Referência'
                        variant="outlined"
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
                            onChange={handleChangeActivities}
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
                            onChange={handleChangePeriod}
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
                        onChange={handleChangeProducts}
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

                <Button variant="outlined" >Cadastrar</Button>
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


