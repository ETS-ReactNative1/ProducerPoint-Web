import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Tabs, Tab, Typography, Box, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

import TaskList from '../../../components/TaskList'

import api from '../../../services/api'

const NavTabs = () => {

    const classes = useStyles()
    const [value, setValue] = useState(0);
    const [todayTasks, setTodayTasks] = useState([])
    const [futureTasks, setFutureTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const request = await api.getAllTodayTasks()
            const response = await request.json()
            setTodayTasks(response)
        }
        getTasks()
    }, [])

    useEffect(() => {
        const getTasks = async () => {
            const request = await api.getAllFutureTasks()
            const response = await request.json()
            setFutureTasks(response)
        }
        getTasks()
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
            >
                <LinkTab label="Tarefas de Hoje" {...a11yProps(0)} />
                <LinkTab label="Tarefas Futuras" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <TaskList data={todayTasks} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TaskList data={futureTasks} />
            </TabPanel>
        </div>
    );
}

export default NavTabs

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10
    },
    button: {
        margin: theme.spacing(1),
        marginLeft: 20,
    },
}))

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    const classes = useStyles()

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<AddIcon />}
            >
                Tarefa
            </Button>
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

const LinkTab = (props) => {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}
