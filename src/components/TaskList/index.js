import React, { useState } from 'react'
import {
    makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import DeleteIcon from '@material-ui/icons/Delete';
import ToggleButton from '@material-ui/lab/ToggleButton'

const TodayTasks = ({ data }) => {

    const [selected, setSelected] = useState(false)
    const classes = useStyles()

    const handleChange = (index) => {

    }

    return (
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
                                    value="check"
                                    selected={selected}
                                    onChange={() => handleChange(row.id)}
                                >
                                    <CheckIcon />
                                </ToggleButton>
                            </TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="left">{row.date}</TableCell>
                            <TableCell align="left">
                                <IconButton color='secondary' aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TodayTasks

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
