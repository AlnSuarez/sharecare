'use client';

import { InputAdornment, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";

const validateFullName = (name) => /^[A-Za-z]+ [A-Za-z]+$/.test(name.trim());

export function Fullname(props) {
    const [errorText, setErrorText] = useState('');

    const handleBlur = () => {
        const isValid = validateFullName(props.value || ''); 
        if (!isValid) {
            setErrorText('Add both first and last name');
            props.setErrors((prevErrors) => ({
                ...prevErrors,
                fullName: true,
            }));
        } else {
            setErrorText('');
            props.setErrors((prevErrors) => ({
                ...prevErrors,
                fullName: false,
            }));
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        props.setFullName(value); 
        props.handleInputChange('fullName')(e);

        if (props.errors.fullName && validateFullName(value)) {
            props.setErrors((prevErrors) => ({
                ...prevErrors,
                fullName: false,
            }));
        }
    };

    return (
        <TextField
            label={errorText || 'Full name'}
            variant='standard'
            fullWidth
            error={props.errors.fullName}
            onBlur={handleBlur}
            onChange={handleChange}
            value={props.value || ''} 
            InputLabelProps={{
                shrink: true,
            }}
            sx={props.textFieldStyle('fullName')}
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
