import React, { useState, useEffect } from 'react'
import {
    makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import DeleteIcon from '@material-ui/icons/Delete';
import ToggleButton from '@material-ui/lab/ToggleButton'

import api from '../../services/api'

import ConfimationModal from '../../components/Modals/ConfimationModal'
import WarningModal from '../../components/Modals/WarningModal'
import Success from '../../assets/lotties/success.json'
import Fail from '../../assets/lotties/fail.json'

const TodayTasks = ({ data }) => {

    const [selected, setSelected] = useState(false)
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const [filteredSearch, setFilteredSearch] = useState([])

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)

    const handleDelete = (id) => {
        setId(id)
        handleOpen()
    }

    const doDelete = async () => {
        const response = await api.deleteTask(id)
        if (response.status === 200) {
            handleClose()
            setFilteredSearch(
                data?.filter((i) => i.id !== id)
            )
            setLottie(Success)
            setMessage('Tarefa excluída com sucesso!')
            handleOpenWarningModal()
        } else {
            handleClose()
            setLottie(Fail)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleOpenWarningModal()
        }
    }

    const handleChange = (index) => setSelected(!selected)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Status</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Tarefa</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Data</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Exluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    <ToggleButton
                                        value={selected}
                                        selected={row.status}
                                        onChange={() => handleChange(row.id)}

                                    >
                                        <CheckIcon />
                                    </ToggleButton>
                                </TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">
                                    <IconButton onClick={() => handleDelete(row.id)} color='secondary' aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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

export default TodayTasks

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});