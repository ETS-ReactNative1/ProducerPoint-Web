import React from 'react'
import { TextField } from '@material-ui/core'
import { useField } from 'formik'

const DateTimePicker = ({ name, ...otherProps }) => {

    const [field, meta] = useField(name)
    const today = new Date();

    const configDateTimePicker = {
        ...field,
        ...otherProps,
        type: 'date',
        variant: 'outlined',
        fullWidth: true,
        maxDate: today,
        InputProps: { maxDate: today },
        InputLabelProps: {
            shrink: true,
        }
    }

    if (meta && meta.touched && meta.error) {
        configDateTimePicker.error = true
        configDateTimePicker.helperText = meta.error
    }

    return (
        <TextField
            {...configDateTimePicker}
        />
    )
}

export default DateTimePicker
