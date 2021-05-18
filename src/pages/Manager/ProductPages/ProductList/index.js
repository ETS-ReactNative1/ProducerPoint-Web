import React, { useState, useMemo, useContext } from 'react'
import { Link } from 'react-router-dom'

import {
    makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TablePagination, IconButton,
    Tooltip, TextField, InputAdornment
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AssessmentIcon from '@material-ui/icons/Assessment'
import SearchIcon from '@material-ui/icons/Search'

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
            products?.filter((i) => i.label.toLowerCase().includes(lowerSearch))
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
            const filtered = filteredSearch?.filter((i) => i.value !== value)
            setFilteredSearch(filtered)
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
                <TextField
                    size='small'
                    color='secondary'
                    className={classes.margin}
                    placeholder='Quem você procura?'
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
                            ? filteredSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredSearch
                        )?.map((row) => (
                            <TableRow key={row.value}>
                                <TableCell component="th" scope="row">{row.value}</TableCell>
                                <TableCell scope="row">{row.label}</TableCell>
                                <TableCell align="center">
                                    <div className='button--group'>

                                        <Tooltip title='Detalhes' arrow>
                                            <Link className='link--table' to={`/product-details/${row.value}`} >
                                                <IconButton className='button--detail' color='secondary' aria-label="delete">
                                                    <AssessmentIcon />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>

                                        <Tooltip title='Editar' arrow>
                                            <Link className='link--table' to={`/product-edit/${row.value}`} >
                                                <IconButton className='button--edit' color='secondary' aria-label="delete">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>

                                        <Tooltip title='Excluir' arrow>
                                            <Link className='link--table' to='#' >
                                                <IconButton className='button--delete' onClick={() => handleDelete(row.value)} color='secondary' aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>

                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {(!filteredSearch || filteredSearch?.length === 0) &&
                <div className='emptylist'>
                    <h3>Nenhum produto encontrado</h3>
                </div>
            }
            <TablePagination
                labelRowsPerPage='Itens por página'
                rowsPerPageOptions={[10, 15, 20]}
                component="div"
                count={filteredSearch?.length}
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
