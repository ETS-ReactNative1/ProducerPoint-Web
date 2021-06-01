import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import {
    Grid, Button, makeStyles, Table, TableBody, TablePagination, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton
} from '@material-ui/core'

import CheckIcon from '@material-ui/icons/Check'
import DeleteIcon from '@material-ui/icons/Delete'
import ToggleButton from '@material-ui/lab/ToggleButton'
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment'
import ReplyIcon from '@material-ui/icons/Reply'

import api from '../../services/api'

import ConfimationModal from '../../components/Modals/ConfimationModal'
import WarningModal from '../../components/Modals/WarningModal'
import Success from '../../assets/lotties/success.json'
import Fail from '../../assets/lotties/fail.json'

import { Area } from './styles'

const SalesList = ({ data, showProducer }) => {
    
    const history = useHistory()

    const [open, setOpen] = useState(false)
    const [showProducerName, setShowProducer] = useState(showProducer)
    const [id, setId] = useState(null)
    const [search, setSearch] = useState('')
    const [filteredSearch, setFilteredSearch] = useState([])

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const classes = useStyles()

    const handleDelete = (id) => {
        setId(id)
        handleOpen()
    }

    const doDelete = async () => {
        const response = await api.deleteSale(id)
        if (response.status === 200) {
            handleClose()
            const filtered = data?.filter((i) => i.id !== id)
            setFilteredSearch(filtered)
            setLottie(Success)
            setMessage('Venda excluída com sucesso!')
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
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    return (
        <Area>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {showProducerName?
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Productor</TableCell>
                            :<></>}
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Data</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Produto</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Quantidade</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Valor</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Vendido Para</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((i, k) => (
                            <TableRow key={k}>
                                {showProducerName?
                                <TableCell align="left">{i.producer.name}</TableCell>
                                :<></>}
                                <TableCell
                                    align="left">{moment(i.date).locale('pt-br').format('D/MM/yyyy')}
                                </TableCell>
                                <TableCell
                                    align="left">{i.product.label}
                                </TableCell>
                                <TableCell
                                    align="left">{i.quantity}
                                </TableCell>
                                <TableCell
                                    align="left">{i.valor}
                                </TableCell>
                                <TableCell
                                    align="left">{i.city}
                                </TableCell>
                                <TableCell align="left">
                                    <IconButton onClick={() => handleDelete(i.id)} color='secondary' aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            {(!data || data?.length === 0) &&
                <div className={classes.emptylist}>
                    <h3>Sem vendas no momento</h3>
                </div>
            }

            <Grid container
                direction="row-reverse"
                justify="space-around"
                alignItems="center"
                spacing={2}
            >
                
                <Grid item xs={12} md={8}>
                    <TablePagination
                        labelRowsPerPage='Itens por página'
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={filteredSearch?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Grid>
                
                <Grid item xs={10} sm={4} md={2}>
                    <Link className={classes.link} to='/sale-form'>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            className={classes.button}
                            size='small'
                        >
                            Venda
                        </Button>
                    </Link>
                </Grid>

                <Grid item xs={10} sm={4} md={2}>
                    <Button 
                        variant="contained"
                        color="primary"
                        startIcon={<ReplyIcon />}
                        className={classes.buttonBack}
                        onClick={() => history.goBack()}
                        size='small'
                    >
                        Voltar
                    </Button>
                </Grid>
                
            </Grid>

            {open &&
                <ConfimationModal
                    handleClose={handleClose}
                    open={open}
                    doDelete={doDelete}
                    title='Deseja realmente excluir esta venda?'
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

export default SalesList

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#007200',
        width: '100%',
        '&:hover': {
            background: '#005200'
        },
    },
    buttonBack: {
        margin: theme.spacing(1),
        backgroundColor: '#458CB8',
        width: '100%',
        '&:hover': {
            background: '#33617D'
        },
    },
    link: {
        textDecoration: 'none'
    }
}));