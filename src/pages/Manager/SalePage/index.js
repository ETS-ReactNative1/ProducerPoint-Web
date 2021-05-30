import React, { useState, useEffect } from 'react'

import api from '../../../services/api'
import SalesList from '../../../components/SalesList'

import { Area } from './styles'

import {
    Grid, makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TablePagination, IconButton,
    Tooltip, TextField, InputAdornment, Button
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AssessmentIcon from '@material-ui/icons/Assessment'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import ReplyIcon from '@material-ui/icons/Reply'

const SalePage = () => {

    const [sales, setSales] = useState([])
    const classes = useStyles()
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getSales = async () => {
            const response = await api.getAllSales()
            setSales(response.data)
        }
        getSales()
    }, [])

    return (
        <Area>
            <div className='title--box'>
                <h3>lista de Vendas</h3>
                <TextField
                    size='small'
                    color='secondary'
                    className={classes.margin}
                    placeholder='Qual atividade procura?'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={search}
                    onChange={ev => setSearch(ev.target.value)}
                />
            </div>
            <TableContainer component={Paper}>
                <SalesList 
                data={sales}
                showProducer={true}
                />
            </TableContainer>
            
        </Area>
    );
}

export default SalePage

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#007200',
        width: "100%",
        '&:hover': {
            background: '#005200'
        },
    },
    buttonBack: {
        margin: theme.spacing(1),
        backgroundColor: '#458CB8',
        width: "100%",
        '&:hover': {
            background: '#33617D'
        },
    },
    link: {
        textDecoration: 'none'
    }
}))