'use client';

import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';

export function Address({ value, setAddress, errors, setErrors, textFieldStyle, handleInputChange }) {
    const [errorText, setErrorText] = useState('');

    const handleBlur = () => {
        if (!value || !value.trim()) {
            setErrorText('Address is required');
            setErrors((prevErrors) => ({
                ...prevErrors,
                address: true,
            }));
        } else if (!addressOptions.includes(value.trim())) {
            setErrorText('Please enter a valid residential address');
            setErrors((prevErrors) => ({
                ...prevErrors,
                address: true,
            }));
        } else {
            setErrorText('');
            setErrors((prevErrors) => ({
                ...prevErrors,
                address: false,
            }));
        }
    };

    const handleChange = (e, newValue) => {
        if (!newValue) {
            newValue = '';
        }
        setAddress(newValue);
        handleInputChange('address')({ target: { value: newValue } });

        if (newValue.trim() === '') {
            setErrorText('Address is required');
            setErrors((prevErrors) => ({
                ...prevErrors,
                address: true,
            }));
        } else if (errors.address && newValue.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address: false,
            }));
        }
    };

    const addressOptions = [
        '123 Main St, Springfield, IL',
        '456 Elm St, Metropolis, NY',
        '789 Oak St, Gotham, NJ',
        '101 Pine St, Star City, CA',
        '202 Maple Ave, Central City, KS',
    ];

    return (
        <Autocomplete
            freeSolo
            options={addressOptions}
            value={value}
            onChange={(event, newValue) => handleChange(event, newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={errorText || 'Full address (e.g. "1 Elm Way, San Francisco, CA")'}
                    variant='standard'
                    fullWidth
                    error={errors.address}
                    onBlur={handleBlur}
                   
                    sx={{
                        ...textFieldStyle('address'),
                        '& .MuiInputBase-root': {
                            paddingTop: '20px',
                            paddingLeft: '20px',
                        },
                        '& .MuiAutocomplete-inputRoot': {
                            paddingTop: '20px',
                            paddingLeft: '20px',
                            
                        },
                    }}
                    InputProps={{
                        ...params.InputProps,
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
            )}
        />
    );
}
