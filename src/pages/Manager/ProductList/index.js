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

import { Container, Body } from '../../../components/MainStyles'
import { Area } from './styles'
import SideBar from '../../../components/SideBar'

const ProductList = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const response = await api.getAllProducts()
            setProducts(response)
        }
        getProducts()
    }, [])

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    const classes = useStyles();

    return (
        <Container>
            <SideBar />
            <Body>
                <Area>
                    <div className='title--box'>
                        <h3>lista de produtos</h3>
                        <div className='title--search'>
                            <input type='text' placeholder='Qual produto?' />
                            <button onClick={() => alert('prestou')}>Buscar</button>
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className='title--table' align="left">COD</TableCell>
                                    <TableCell className='title--table' align="left">Nome</TableCell>
                                    <TableCell className='title--table' align="center">Opções</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((row) => (
                                    <TableRow key={row.value}>
                                        <TableCell component="th" scope="row">{row.value}</TableCell>
                                        <TableCell scope="row">{row.label}</TableCell>
                                        <TableCell align="center">
                                            <div className='button--group'>
                                                <Link className='link--table' to={`/product-details/${row.value}`} >
                                                    <button className='button--detail'>Detalhes</button>
                                                </Link>
                                                <Link className='link--table' to={`/product-edit/${row.value}`} >
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
            </Body>
        </Container>
    );
}

export default ProductList
