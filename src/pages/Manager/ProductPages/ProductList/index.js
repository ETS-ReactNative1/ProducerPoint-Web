import React, { useState, useMemo, useContext } from 'react'
import { Link } from 'react-router-dom'

import {
    makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TablePagination
} from '@material-ui/core'

import api from '../../../../services/api'
import { RequestContext } from '../../../../contexts/RequestContext'

import ConfimationModal from '../../../../components/Modals/ConfimationModal'
import WarningModal from '../../../../components/Modals/WarningModal'
import Success from '../../../../assets/lotties/success.json'
import Fail from '../../../../assets/lotties/fail.json'

import { Area } from './styles'

const ProductList = () => {

    const { products } = useContext(RequestContext)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [search, setSearch] = useState('')
    const [filteredSearch, setFilteredSearch] = useState([])

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const classes = useStyles()

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    useMemo(() => {
        const lowerSearch = search.toLowerCase()
        setFilteredSearch(
            products.filter((i) => i.label.toLowerCase().includes(lowerSearch))
        )
    }, [search, products])

    const handleDelete = (value) => {
        setValue(value)
        handleOpen()
    }

    const doDelete = async () => {
        const response = await api.deleteProduct(value)
        if (response.status === 200) {
            handleClose()
            setFilteredSearch(
                filteredSearch.filter((i) => i.value !== value)
            )
            setLottie(Success)
            setMessage('Produto excluído com sucesso!')
            handleOpenWarningModal()
        } else {
            handleClose()
            setLottie(Fail)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleOpenWarningModal()
        }
    }

    const handleChangePage = (event, newPage) => { setPage(newPage) }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Area>
            <div className='title--box'>
                <h3>lista de produtos</h3>
                <div className='title--search'>
                    <input type='text' value={search} onChange={ev => setSearch(ev.target.value)} placeholder='Qual produto procura?' />
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
                        {(rowsPerPage > 0
                            ? filteredSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredSearch
                        ).map((row) => (
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
                                            <button onClick={() => handleDelete(row.value)} className='button--delete'>Excuir</button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage='Itens por página'
                rowsPerPageOptions={[10, 15, 20]}
                component="div"
                count={filteredSearch.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            {open &&
                <ConfimationModal
                    handleClose={handleClose}
                    open={open}
                    doDelete={doDelete}
                    title='Deseja realmente excluir este produto?'
                />
            }
            {warningModal &&
                <WarningModal
                    handleClose={handleCloseWarningModal}
                    open={warningModal}
                    message={message}
                    lottie={lottie}
                />
            }
        </Area>
    );
}

export default ProductList

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
