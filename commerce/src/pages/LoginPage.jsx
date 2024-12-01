import React from 'react'
import '../css/RegisterPage.css'
import '../css/LoginPage.css'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { RxPerson } from "react-icons/rx";
import { TfiLock } from "react-icons/tfi";
import { useFormik } from 'formik';
import { registerPageShema } from '../shemas/RegisterPageShemas';
import loginPageService from '../services/LoginPageService';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCurrentUser, setLoading } from '../redux/appSlice';
import Navbar from '../components/Navbar'

function LoginPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkUser = (userList, username, password) => {
    const response = { result:false ,currentUser:null }
    userList.forEach((user) => {
      if (user.username === username && user.password === password) {
        response.result = true;
        response.currentUser= user;
      }
    })
    return response;
  }

  const submit = async (values, actions) => {
    try {
      dispatch(setLoading(true))
      const response = await loginPageService.login()
      if (response) {
        const checkUserResponse = checkUser(response, values.username, values.password)
        if (checkUserResponse.result && checkUserResponse.currentUser) {
          dispatch(setCurrentUser(checkUserResponse.currentUser))
          localStorage.setItem("currenUser",JSON.stringify(checkUserResponse.currentUser))
          navigate("/")
        } else {
          toast.error("Username or password is incorrect")
        }
      }
    } catch (error) {
      toast.error("An error occurred while logging in:" + error)
    }
    finally {
      dispatch(setLoading(false))
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
    <div>
      <Navbar/>
      <div className='login'>
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

export default LoginPage