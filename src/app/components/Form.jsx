'use client';
import React, { useState } from 'react';
import {
    Button,
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BadgeIcon from '@mui/icons-material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import './Form.css';
import { Fullname } from './Fullname';
import { Address } from './Address';
import { Mobile } from './Mobile';
import { Dateofbirth } from './Dateofbirth';
import { Mail } from './Mail';
import { handleInputChangeHelper } from '../Helpers/form';

export default function Form() {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState({
        fullName: false,
        address: false,
        mobile: false,
        dob: false,
        email: false,
    });
    const [mobile, setMobile] = useState('');
    const [dob, setDob] = useState('');
    const [dobError, setDobError] = useState('');
    const [email, setEmail] = useState('');

    const handleInputChange = (field) => (event) => {
        handleInputChangeHelper(field, event, setFullName, errors, setErrors);
    };

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const handleSubmit = async () => {
        const validateEmail = (email) => {
            // Expresión regular mejorada para validar correos electrónicos
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        };

        const newErrors = {
            fullName: !fullName.trim(),
            address: !address.trim(),
            mobile: !mobile.trim(),
            dob: !dob.trim(),
            email: !email.trim() || !validateEmail(email.trim()), // Verifica si el correo es válido
        };

        setErrors(newErrors);

        // Verificar si hay algún error antes de continuar
        const hasErrors = Object.values(newErrors).some((error) => error);
        if (hasErrors) {
            console.error('Hay campos obligatorios que necesitan atención.');
            return; // Detener la ejecución si hay errores
        }

        const formData = {
            fullName,
            address,
            gender,
            mobile,
            dob,
            email,
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Registro exitoso');
            } else {
                console.error('Error al registrar:', response.status);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const textFieldStyle = (field) => ({
        backgroundColor: errors[field] ? '#FEF2F2' : '#FFFFFF',
        paddingTop: '0px',
        '& .MuiInputLabel-root': {
            marginTop: '10px',
            color: errors[field] ? '#ff0000' : '#000000',
            paddingTop: '0px',
            paddingLeft: '20px',
        },
        '& .MuiInputBase-input': {
            color: '#1C2A46',
            paddingTop: '20px',
            paddingLeft: '20px',
            paddingBottom: '20px',
        },
        '& .Mui-focused .MuiInputLabel-root': {
            color: '#00BFA5',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#909090',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#00BFA5',
        },
        '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: errors[field] ? '#ff0000' : '#00BFA5',
        },
        '& .Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: '#00BFA5',
        },
        '& .MuiInputBase-root': {
            paddingTop: '0px',
        },
    });

    return (
        <div className='register-form'>
            <div className='register-header'>
                <img
                    src='https://storage.googleapis.com/cdn.healthtrak.com/app/sha-4448f12/public/img/sharecare/logo.svg'
                    alt='Sharecare Logo'
                />
                <Button
                    variant='outlined'
                    sx={{
                        color: 'black',
                        borderColor: '#00BFA5',
                        backgroundColor: 'white',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#ECFDF5',
                        },
                    }}
                >
                    How it works
                </Button>
            </div>

            <div className='register-form-inputs'>
                <div className='register-sign-up-title-container'>
                    <h2
                        className='register-sign-up-title'
                        style={{ color: '#006658' }}
                    >
                        Sign up
                    </h2>
                </div>
                <div className='register-form-card'>
                    <Card
                        variant='outlined'
                        sx={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
                    >
                        <Typography
                            gutterBottom
                            variant='h5'
                            style={{ color: '#2B3649', padding: '18px' }}
                        >
                            <BadgeIcon
                                style={{
                                    color: '#2B3649',
                                    marginRight: '20px',
                                }}
                            />{' '}
                            Your information
                        </Typography>
                        <Divider style={{ backgroundColor: '#00BFA5' }} />
                        <Fullname
                            errors={errors}
                            value={fullName}
                            setFullName={setFullName}
                            setErrors={setErrors}
                            handleInputChange={handleInputChange}
                            textFieldStyle={textFieldStyle}
                        />

                        <Address
                            errors={errors}
                            value={address}
                            setAddress={setAddress}
                            setErrors={setErrors}
                            handleInputChange={handleInputChange}
                            textFieldStyle={textFieldStyle}
                        />
                        <Mobile
                            errors={errors}
                            mobile={mobile}
                            setMobile={setMobile}
                            setErrors={setErrors}
                            textFieldStyle={textFieldStyle}
                        />
                        <Dateofbirth
                            dob={dob}
                            dobError={dobError}
                            errors={errors}
                            setErrors={setErrors}
                            setDob={setDob}
                            textFieldStyle={textFieldStyle}
                        />
                        <FormControl
                            fullWidth
                            sx={{ marginTop: '10px' }}
                        >
                            <InputLabel id='demo-simple-select-label'>
                                Gender
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={gender}
                                label='Gender'
                                onChange={handleChange}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                    '& .MuiSelect-root': {
                                        color: '#00BFA5',
                                    },
                                }}
                            >
                                <MenuItem value='Male'>Male</MenuItem>
                                <MenuItem value='Female'>Female</MenuItem>
                                <MenuItem value='Other'>Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Card>

                    <Mail
                        value={email}
                        setEmail={setEmail}
                        errors={errors}
                        setErrors={setErrors}
                        handleInputChange={handleInputChange}
                        textFieldStyle={textFieldStyle}
                    />

                    

                    <Button
                        variant='contained'
                        disableElevation
                        fullWidth
                        startIcon={<MailIcon />}
                        style={{
                            backgroundColor: '#152438',
                            color: '#FFFFFF',
                            textTransform: 'none',
                            height: '60px',
                            marginTop: '20px',
                            borderRadius: '10px',
                            fontSize: '18px',
                        }}
                        onClick={handleSubmit}
                    >
                        Continue with email
                    </Button>

                    {/* Acordeón para mostrar términos de oferta */}
                    <Accordion
                        sx={{
                            marginTop: '20px',
                            boxShadow: 'none',
                            background: 'none',
                            '&:before': {
                                display: 'none',
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon sx={{ color: '#00BFA5' }} />
                            }
                            aria-controls='panel1a-content'
                            id='panel1a-header'
                            sx={{
                                padding: '0px',
                                minHeight: 'unset',
                                '& .MuiAccordionSummary-content': {
                                    margin: '0px',
                                },
                            }}
                        >
                            <Typography sx={{ color: '#2B3649' } }>
                                By signing up, I agree to the{' '}
                                <span style={{ color: '#00BFA5' }}>
                                    Offer Terms
                                </span>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                padding: '0px',
                                marginTop: '10px',
                                textAlign: 'center', // Centrar el texto
                                fontFamily:
                                    '"Helvetica Neue", Helvetica, Arial, sans-serif', // Fuente personalizada
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#2B3649',
                                    fontSize: '0.875rem',
                                    fontFamily:
                                        '"Times new roman", Helvetica, Arial, sans-serif', // Fuente personalizada
                                }}
                            >
                                I agree to the{' '}
                                <span style={{ color: '#00BFA5' }}>
                                    Offer Terms
                                </span>{' '}
                                and understand I am creating a Sharecare
                                consumer account. I agree to the{' '}
                                <span style={{ color: '#00BFA5' }}>
                                    Sharecare Privacy Policy
                                </span>
                                ,{' '}
                                <span style={{ color: '#00BFA5' }}>Terms</span>,{' '}
                                <span style={{ color: '#00BFA5' }}>
                                    Consumer Health Data Privacy Policy
                                </span>
                                , and, if applicable to me, the{' '}
                                <span style={{ color: '#00BFA5' }}>
                                    Privacy Notice for California Residents
                                </span>
                                . I consent to Sharecare’s collecting and
                                sharing of any health information I may provide,
                                for the purposes listed in the{' '}
                                <span style={{ color: '#00BFA5' }}>
                                    Consumer Health Data Privacy Policy
                                </span>{' '}
                                and{' '}
                                <span style={{ color: '#00BFA5' }}>
                                    Privacy Policy
                                </span>
                                . I agree to receive emails, offers, alerts, and
                                other notices. I understand that I can opt-out
                                of marketing communications at any time.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
