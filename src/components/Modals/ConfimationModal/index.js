import React from 'react'

import { makeStyles, Modal, Backdrop, Fade } from '@material-ui/core';
import { Container } from './styles'

const ConfimationModal = ({ open, handleClose, title, doDelete }) => {

    const classes = useStyles();

    return (
        <Container>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2>{title}</h2>
                        <div className={classes.buttons}>
                            <button onClick={handleClose} className={classes.noButton}>Não</button>
                            <button onClick={doDelete} className={classes.yesButton}>Sim</button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </Container>
    )
}

export default ConfimationModal

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 8,
    },
    noButton: {
        height: 40,
        width: '48%',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 8,
        border: 'none',
        backgroundColor: '#da1e37',
        cursor: 'pointer',

        '&:hover': {
            background: '#920000'
        },
    },
    yesButton: {
        height: 40,
        width: '48%',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 8,
        border: 'none',
        backgroundColor: '#007200',
        cursor: 'pointer',

        '&:hover': {
            background: '#005200'
        },

    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
}));
