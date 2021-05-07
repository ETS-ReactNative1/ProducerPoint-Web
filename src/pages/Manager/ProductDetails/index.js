import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import api from '../../../services/api'

import { Area } from './styles'

const ProductDetails = () => {

    const [producers, setProducers] = useState([])

    useEffect(() => {
        const getProducers = async () => {
            const response = await api.getAllProducers()
            setProducers(response)
        }

        getProducers()
    }, [])

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    const classes = useStyles();

    return (
        <Area>
            <div className='title--box'>
                <h3>lista de produtores</h3>
                <div className='title--search'>
                    <input type='text' placeholder='Quem você procura?' />
                    <button onClick={() => alert('prestou')}>Buscar</button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='title--table' align="center">Nome</TableCell>
                            <TableCell className='title--table' align="center">CPF</TableCell>
                            <TableCell className='title--table' align="center">Telefone</TableCell>
                            <TableCell className='title--table' align="center">Atividade</TableCell>
                            <TableCell className='title--table' align="center">Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {producers.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.cpf}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">{row.farmingActivity.activityName}</TableCell>
                                <TableCell align="right">
                                    <div className='button--group'>
                                        <Link className='link--table' to={`/producer-details/${row.id}`} >
                                            <button className='button--detail'>Detalhes</button>
                                        </Link>
                                        <Link className='link--table' to={`/producer-edit/${row.id}`} >
                                            <button className='button--edit'>Editar</button>
                                        </Link>
                                        <Link className='link--table' to={`#`} >
                                            <button className='button--delete'>Excuir</button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Area>
    );
}

export default ProductDetails
