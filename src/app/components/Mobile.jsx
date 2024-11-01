'use client';

import { InputAdornment, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";

export function Mobile({ mobile, setMobile, errors, setErrors, textFieldStyle }) {
    const [errorText, setErrorText] = useState('');

    const handleBlur = () => {
        const isValid = mobile.replace(/\D/g, '').length === 10;
        if (!isValid) {
            setErrorText('Phone number must be at least 10 digits');
            setErrors((prevErrors) => ({
                ...prevErrors,
                mobile: true,
            }));
        } else {
            setErrorText('');
            setErrors((prevErrors) => ({
                ...prevErrors,
                mobile: false,
            }));
        }
    };

    const handleChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').slice(0, 10); 
        const formattedMobile = input
            .replace(/^(\d{3})(\d{3})(\d{0,4})$/, '($1) $2-$3')
            .trim();

        setMobile(formattedMobile); // Utiliza setMobile directamente

        if (errors.mobile && formattedMobile.replace(/\D/g, '').length === 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                mobile: false,
            }));
        }
    };

    return (
        <TextField
            label={
                errorText || 
                (errors.mobile ? 'Mobile number is required' : 'Mobile number')
            }
            variant='standard'
            fullWidth
            error={errors.mobile || Boolean(errorText)}
            placeholder='(000) 000-0000'
            onBlur={handleBlur}
            onChange={handleChange}
            value={mobile}
            InputLabelProps={{
                shrink: true,
            }}
            sx={textFieldStyle('mobile')}
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
