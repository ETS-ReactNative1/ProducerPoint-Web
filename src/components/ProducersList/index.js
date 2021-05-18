import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
    makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TablePagination, IconButton,
    Tooltip, Button
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AssessmentIcon from '@material-ui/icons/Assessment'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import WorkIcon from '@material-ui/icons/Work'

import api from '../../services/api'

import ConfimationModal from '../Modals/ConfimationModal'
import WarningModal from '../../components/Modals/WarningModal'
import Success from '../../assets/lotties/success.json'
import Fail from '../../assets/lotties/fail.json'
import { Area } from './styles'

const ProducersList = ({ data, title }) => {

    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
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
            data?.filter((i) => i.name.toLowerCase().includes(lowerSearch))
        )
    }, [search, data])

    const handleDelete = (id) => {
        setId(id)
        handleOpen()
    }

    const doDelete = async () => {
        const response = await api.deleteProducer(id)
        if (response.status === 200) {
            handleClose()
            const filtered = filteredSearch?.filter((i) => i.id !== id)
            setFilteredSearch(filtered)
            setLottie(Success)
            setMessage('Prorutor excluído com sucesso!')
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
                <h3>{title}</h3>
                <div className='title--search'>
                    <input type='text' value={search} onChange={ev => setSearch(ev.target.value)} placeholder='Quem você procura?' />
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
                        {(rowsPerPage > 0
                            ? filteredSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredSearch
                        )?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.cpf}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">
                                    <Link className='link--activity' to={`/activity-details/${row.farmingActivity?.activityName?.value}`}>
                                        <Button
                                            variant="contained"
                                            startIcon={<WorkIcon />}
                                            size='small'
                                        >
                                            {row.farmingActivity?.activityName?.label}
                                        </Button>
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    <div className='button--group'>
                                        <Link className='link--table' to={'#'} >
                                            <IconButton className='button--report' color='secondary' aria-label="delete">
                                                <PictureAsPdfIcon />
                                            </IconButton>
                                        </Link>
                                        <Link className='link--table' to={`/producer-details/${row.id}`} >
                                            <IconButton className='button--detail' color='secondary' aria-label="delete">
                                                <AssessmentIcon />
                                            </IconButton>
                                        </Link>

                                        <Link className='link--table' to={`/producer-edit/${row.id}`} >
                                            <IconButton className='button--edit' color='secondary' aria-label="delete">
                                                <EditIcon />
                                            </IconButton>
                                        </Link>

                                        <Link className='link--table' to='#' >
                                            <IconButton className='button--delete' onClick={() => handleDelete(row.id)} color='secondary' aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>

                </Table>

            </TableContainer>
            {(!filteredSearch || filteredSearch?.length === 0) &&
                <div className='emptylist'>
                    <h3>Nenhum produtor relacionado</h3>
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
                    title='Deseja realmente excluir este produtor?'
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

export default ProducersList

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
