import showPassword from '../../assets/images/show-pw.svg'
import Banner from '../../assets/images/banner.svg'
import LogoLogin from '../../assets/images/Logo-Login.png'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SingIn } from '../../Utils/validation'

export const SignIn = () => {
    return(
        <div className="container" style={{ height: '100vh', width: '100vw' }}>
        <div className="row h-100 align-items-center">
            <div className="col-lg-7 d-none d-lg-block">
            <img src={Banner} alt="Banner" className="img-fluid" />
            </div>

            <div className="col-lg-5">
            <div className=" mt-3 d-flex justify-content-center">
                <img src={LogoLogin} alt="Logo" className="img-fluid"></img>
            </div>
            <div>
                <FormSignIn />
            </div>
            </div>

        </div>
        </div>
    )
}

const FormSignIn = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword:'',
    })
    const [errorMsg, setErrorMsg] = useState({
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleFormInput = (e) => {
        const { name, value } = e.target
        setForm({
            ...form, // nyalin
            [name]: value // mengubah
        })

        validateRegist(e)
    }


    const validateRegist = (e) => {
        const { name, value } = e.target;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        let errors = { ...errorMsg };

        if (name === 'email') {
            if (value === '') {
                errors.email = 'Email tidak boleh kosong.';
            } else if (!emailRegex.test(value)) {
                errors.email = 'Masukkan email yang valid.';
            } else {
                errors.email = '';
            }
        } else if (name === 'password') {
            if (value === '') {
                errors.password = 'Password tidak boleh kosong.';
            } else if (!passwordRegex.test(value)) {
                errors.password = 'Password harus memiliki setidaknya 8 karakter, 1 karakter khusus, angka, dan huruf.';
            } else {
                errors.password = '';
            }
        } else if (name === 'username') {
            if (value === '') {
                errors.username = 'Nama tidak boleh kosong.';
            } else {
                errors.username = '';
            }
        } else if (name === 'phone') {
            if (value === '') {
                errors.phone = 'No Handphone tidak boleh kosong.';
            } else {
                errors.phone = '';
            }
        } else if (name === 'confirmPassword') {
            if (value !== form.password) {
                errors.confirmPassword = 'Konfirmasi password tidak cocok dengan password.';
            } else {
                errors.confirmPassword = '';
            }
        }

        setErrorMsg(errors);
    };

    const handlePostRegister = async () => {
        console.log('handlePostRegister called');
        const formData = SingIn(form); 
        console.log('Form Data to be sent:', formData);

        for (const field in form) {
            validateLogin({ target: { name: field, value: form[field] } });
        }

        // Check if there are any errors
        if (Object.values(errorMsg).every((msg) => msg === '')) {
            try {
                const res = await axios.post('http://localhost:3000/api/v1/user/register', formData);
                console.log('Response:', res);

                if (res.status === 201) {
                    toast.success('Register successful');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Anda gagal login', { delay: 800 });
            }
        } else {
            console.log('Validation failed');
        }
    };

    return(
        <form className='mt-4'>
            <div className="mb-3">
                <h3 className="fw-bold text-primary">Portal User</h3>
                <p>Manajemen Informasi dengan baik, Silahkan Masuk Untuk Mengakses!</p>
            </div>

            <div className="mb-3">
                <label htmlFor="nama" className="form-label">
                    Nama 
                </label>
                <input
                    type="nama"
                    className="form-control"
                    name='username'
                    value={form.username}
                    placeholder="Masukkan Nama Lengkap"
                    onChange={(e) => handleFormInput(e)}
                />
                <p className='error'>{errorMsg.username}</p>
            </div>

            <div className="mb-3">
                <label htmlFor="nohp" className="form-label">
                    No Hanphone 
                </label>
                <input
                    type="nohp"
                    className="form-control"
                    name='phone'
                    value={form.phone}
                    placeholder="Masukkan no Handphone"
                    onChange={(e) => handleFormInput(e)}
                />
                <p className='error'>{errorMsg.phone}</p>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email 
                </label>
                <input
                    type="email"
                    className="form-control"
                    name='email'
                    value={form.email}
                    placeholder="Masukkan Email"
                    onChange={(e) => handleFormInput(e)}
                />
                <p className='error'>{errorMsg.email}</p>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password 
                </label>
                <div className="input-group ">
                    <input
                        type={'password'}
                        className="form-control border-end-0"
                        name="password"
                        value={form.password}
                        placeholder="Masukkan password"
                        onChange={(e) => handleFormInput(e)}
                        
                    />
                    </div>
                    <p className='error'>{errorMsg.password}</p>
                </div>

                <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Confirm Password 
                </label>
                <div className="input-group ">
                    <input
                        type={'password'}
                        className="form-control border-end-0"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        placeholder="Masukkan password"
                        onChange={(e) => handleFormInput(e)}
                        
                    />
                    </div>
                    <p className='error'>{errorMsg.password}</p>
                </div>

                <div className='d-flex flex-column gap-3'>
                <button className="btn btn-primary" type="button" onClick={handlePostRegister}>
                Daftar
                </button>
                </div>
        </form>
    )
}
