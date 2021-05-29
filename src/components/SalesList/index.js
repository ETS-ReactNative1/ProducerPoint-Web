import React, { useState, useEffect } from 'react'
import {
    makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import DeleteIcon from '@material-ui/icons/Delete'
import ToggleButton from '@material-ui/lab/ToggleButton'
import moment from 'moment'

import api from '../../services/api'

import ConfimationModal from '../../components/Modals/ConfimationModal'
import WarningModal from '../../components/Modals/WarningModal'
import Success from '../../assets/lotties/success.json'
import Fail from '../../assets/lotties/fail.json'

const SalesList = ({ data }) => {

    const classes = useStyles()
    const [sales, setSales] = useState(data)
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')

    useEffect(() => {
    }, [])

    const handleDelete = (id) => {
        setId(id)
        handleOpen()
    }

    const doDelete = async () => {
        const response = await api.deleteSale(id)
        if (response.status === 200) {
            handleClose()
            const filtered = sales?.filter((i) => i.id !== id)
            setSales(filtered)
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

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Data</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Produto</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Quantidade</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Valor</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Vendido Para</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales?.map((i, k) => (
                            <TableRow key={k}>
                                <TableCell
                                    align="left">{moment(i.date).locale('pt-br').format('D/MM/yyyy')}
                                </TableCell>
                                <TableCell
                                    align="left">{i.product.name}
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
            {(!sales || sales?.length === 0) &&
                <div className={classes.emptylist}>
                    <h3>Sem vendas no momento</h3>
                </div>
            }
            {open &&
                <ConfimationModal
                    handleClose={handleClose}
                    open={open}
                    doDelete={doDelete}
                    title='Deseja realmente excluir esta tarefa?'
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
        </>
    );
}

export default SalesList

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    emptylist: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#b00',
        opacity: 0.7
    }
});