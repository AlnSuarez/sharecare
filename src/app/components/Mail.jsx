import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

export function Mail({ value, setEmail, errors, setErrors, textFieldStyle, handleInputChange }) {
    const [errorText, setErrorText] = useState('');

    const validateEmail = (email) => {
        // Expresión regular mejorada para validar correos electrónicos
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleBlur = () => {
        if (!value || !value.trim()) {
            setErrorText('Required Field');
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: true,
            }));
        } else if (!validateEmail(value.trim())) {
            setErrorText('Invalid Mail');
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: true,
            }));
        } else {
            setErrorText('');
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: false,
            }));
        }
    };

    const handleChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        handleInputChange('email')({ target: { value: emailValue } });

        // Validar en tiempo real y actualizar los errores si es necesario
        if (validateEmail(emailValue.trim())) {
            setErrorText('');
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: false,
            }));
        } else if (emailValue.trim() !== '') {
            setErrorText('Invalid Mail');
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: true,
            }));
        }
    };

    return (
        <div>
            <TextField
                variant='outlined'
                fullWidth
                error={errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                value={value}
                placeholder='Mail'
                InputLabelProps={{
                    shrink: false, // Oculta el label
                }}
                sx={{
                    ...textFieldStyle('email'),
                    borderColor: errors.email ? 'red' : 'inherit',
                    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                    },
                    paddingTop: '20px',
                }}
            />
            {errorText && (
                <Typography variant='caption' color='error' style={{ marginTop: '4px' }}>
                    {errorText}
                </Typography>
            )}
        </div>
    );
}
