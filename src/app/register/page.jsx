import Form from '../components/Form';
import './Register.css';
export default function Register() {
    return (
        <div className='register-flex'>
            <img src="https://storage.googleapis.com/cdn.healthtrak.com/app/sha-4448f12/public/img/sharecare/signup/banner_1.png" alt="" className='register-image'/>
            <Form/>
        </div>
    );
}
