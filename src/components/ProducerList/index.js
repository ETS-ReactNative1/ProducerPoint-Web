import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import api from '../../services/api'

import ConfimationModal from '../Modals/ConfimationModal'
import { Area } from './styles'

const ProducerList = ({ data, title }) => {

    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const classes = useStyles();

    const handleDelete = (id) => {
        setId(id)
        handleOpen()
    }

    const doDelete = async () => {

        const response = await api.deleteProducer(id)
        if (response.status === 200) {
            console.log('Produtor excluído com sucesso!')
            handleClose()
        } else {
            console.log('Erro: ' + response.status)
            handleClose()
        }
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Area>
            <div className='title--box'>
                <h3>{title}</h3>
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
                        {data?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.cpf}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/activity-details/${row.id}`}>
                                        <button className='link--activity'>{row.farmingActivity?.activityName?.label}</button>
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    <div className='button--group'>
                                        <Link className='link--table' to={`/producer-details/${row.id}`} >
                                            <button className='button--detail'>Detalhes</button>
                                        </Link>
                                        <Link className='link--table' to={`/producer-edit/${row.id}`} >
                                            <button className='button--edit'>Editar</button>
                                        </Link>
                                        <Link className='link--table' to={`#`} >
                                            <button onClick={() => handleDelete(row.id)} className='button--delete'>Excuir</button>
                                        </Link>
                                    </div>
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
                    title='Deseja realmente excluir este produtor?'
                />
            }
        </Area>
    );
}

export default ProducerList

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
