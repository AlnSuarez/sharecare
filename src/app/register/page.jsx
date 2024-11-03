import { Button } from '@mui/material';
import Form from '../components/Form';
import './Register.css';
export default function Register() {
    return (
        <div className='register-flex'>
             <div className='register-header-mobile'>
                <img src='https://storage.googleapis.com/cdn.healthtrak.com/app/sha-4448f12/public/img/sharecare/logo.svg' alt="Sharecare Logo" />
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
            <img src="https://storage.googleapis.com/cdn.healthtrak.com/app/sha-4448f12/public/img/sharecare/signup/banner_1.png" alt="" className='register-image'/>
            <Form/>
        </div>
    );
}
