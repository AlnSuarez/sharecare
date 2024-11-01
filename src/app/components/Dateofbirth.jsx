'use client';

import { InputAdornment, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";

// Validación de fecha en formato MM/DD/YYYY
const validateDateOfBirth = (date) => /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2]\d|3[0-1])\/\d{4}$/.test(date);

export function Dateofbirth(props) {
    const [errorText, setErrorText] = useState('');

    const handleBlur = () => {
        const isValid = validateDateOfBirth(props.dob);
        if (!isValid) {
            setErrorText('Date format must be MM/DD/YYYY');
            props.setErrors((prevErrors) => ({
                ...prevErrors,
                dob: true,
            }));
        } else {
            setErrorText('');
            props.setErrors((prevErrors) => ({
                ...prevErrors,
                dob: false,
            }));
        }
    };

    const handleChange = (e) => {
        let input = e.target.value.replace(/\D/g, '').slice(0, 8); // Limitar a 8 dígitos y eliminar caracteres no numéricos

        // Formatear como MM/DD/YYYY
        if (input.length >= 3 && input.length <= 4) {
            input = `${input.slice(0, 2)}/${input.slice(2)}`;
        } else if (input.length >= 5) {
            input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
        }

        props.setDob(input); // Actualizar el valor de dob en el estado

        // Validación en tiempo real para eliminar el error si la fecha es válida
        if (props.errors.dob && validateDateOfBirth(input)) {
            props.setErrors((prevErrors) => ({
                ...prevErrors,
                dob: false,
            }));
        }
    };

    return (
        <TextField
            label={errorText || 'Date of birth'}
            variant='standard'
            fullWidth
            error={props.errors.dob || Boolean(errorText)}
            placeholder='MM/DD/YYYY'
            onBlur={handleBlur}
            onChange={handleChange}
            value={props.dob}
            InputLabelProps={{
                shrink: true,
            }}
            sx={props.textFieldStyle('dob')}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <EditIcon
                            style={{
                                marginRight: '20px',
                            }}
                        />
                    </InputAdornment>
                ),
            }}
        />
    );
}
