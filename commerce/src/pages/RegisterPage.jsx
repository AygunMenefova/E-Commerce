import React from 'react'
import '../css/RegisterPage.css'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { RxPerson } from "react-icons/rx";
import { TfiLock } from "react-icons/tfi";
import { useFormik } from 'formik';
import { registerPageShema } from '../shemas/RegisterPageShemas';
import registerPageService from '../services/RegisterPageService';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {

    const navigate = useNavigate()

    const submit = async (values, actions) => {
        try {
            const payload = {
                id: Math.floor(Math.random() * 999999),
                username: values.username,
                password: values.password,
                balance: 1000
            }
            const response = await registerPageService.register(payload)
            if (response) {
                clear();
                toast.success("User registered")
                navigate("/login")
            }
        } catch (error) {
            toast.error("An error occurred while registering the user")
        }
    }

    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: submit,
        validationSchema: registerPageShema
    });

    const clear = () => {
        resetForm()
    }
    return (
        <div >
            <div className='register'>
                <div className='main' >
                    <form onSubmit={handleSubmit}>
                        <div className='form-div'>
                            <TextField sx={{ marginBottom: '30px', width: '400px' }}
                                id="username"
                                placeholder='username'
                                value={values.username}
                                onChange={handleChange}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <RxPerson />
                                            </InputAdornment>

                                        ),
                                    },
                                }}
                                variant="standard"
                                helperText={errors.username && <span className='error'>{errors.username}</span>}
                            />
                            <TextField sx={{ marginBottom: '30px', width: '400px' }}
                                id="password"
                                type='password'
                                placeholder='password'
                                value={values.password}
                                onChange={handleChange}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TfiLock />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                variant="standard"
                                helperText={errors.password && <span className='error'>{errors.password}</span>}
                            />

                            <div className='reg-btn'>
                                <Button type='submit' size='small' sx={{ color: '#000', fontStyle: 'italic', fontSize: '12px', letterSpacing: '2px', backgroundColor: 'whitesmoke', boxShadow: '1px 1px 1px 1px #ddd', paddingLeft: '20px', paddingRight: '20px', marginRight: '20px', textTransform: 'lowercase' }}>Sign up</Button>
                                <Button onClick={clear} size='small' sx={{ color: '#000', fontStyle: 'italic', fontSize: '12px', letterSpacing: '2px', backgroundColor: 'whitesmoke', boxShadow: '1px 1px 1px 1px #ddd', paddingLeft: '30px', paddingRight: '30px', textTransform: 'lowercase' }}>Clear</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage