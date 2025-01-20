import Box from '@mui/material/Box'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import  Typography  from '@mui/material/Typography'
import  TextField from '@mui/material/TextField'
import  Card  from '@mui/material/Card'
import  Link  from '@mui/material/Link'
import LoadingButton from '@mui/lab/LoadingButton'
import useAuthStore from '../store/useAuthStore.ts'

const SignUp = () => {

  const [formData,setFormData]=useState<{name:string,email:string,password:string}>({name:"",email:"",password:""})
 
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameErrorMessage, setNameerrorMessage] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  const validateForm = () => {
    if (!formData.name) {
      setNameError(true) 
      setNameerrorMessage("Please enter a name field");return
    }else{
      setNameError(false) 
      setNameerrorMessage("")
    }
    if (formData.name.length < 5){ 
        setNameError(true)
        setNameerrorMessage("Name must be at least 5 characters");return
     }else{
       setNameError(false)
       setNameerrorMessage("")
     }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError(true) 
      setEmailErrorMessage("Invalid email format");return
    }else{
      setEmailError(false) 
      setEmailErrorMessage("")
    }
    if (!formData.password) {
      setPasswordError(true)
      setPasswordErrorMessage("Password is required");return
    }else{
      setPasswordError(false)
      setPasswordErrorMessage("")
    }
    if (formData.password.length < 6){ 
       setPasswordError(true)
       setPasswordErrorMessage("Password must be at least 6 characters");return
    }else{
      setPasswordError(false)
      setPasswordErrorMessage("")
    }
    return true
}
const {signUp,authUser}=useAuthStore()

const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValidate = validateForm()
 if (!isValidate === true) return
    signUp(formData)
    setEmailError(false)
    setPasswordError(false)
    setNameError(false)
}

const handleInput=(e:ChangeEvent<HTMLInputElement>)=>{
  setFormData({...formData,[e.target.name]:e.target.value})
}

if(authUser)console.log(authUser);


  return (
    <Card
    variant='outlined'
    component={'form'}
    onSubmit={handleSubmit}
    sx={{
      width:{sm:'360px',xs:'300px'},
      mx:'auto',
      py:4,
      px:2,
//       background:'rgba(255, 255, 255, 0.31)',
//       boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
// backdropFilter: 'blur(15.5px)',
// WebkitBackdropFilter: 'blur(15.5px)',
    }}
    >
      <Box>
        <Typography
        component="h1"
        variant="h4"
        sx={{py:2, color: 'black', width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)',fontWeight:'bold' }}
        >Sign Up</Typography>
      </Box>
      <Box sx={{py:1}}>
        <TextField 
        error={nameError} 
        label="Name" 
        name='name' 
        fullWidth 
        helperText={nameErrorMessage}
        onChange={handleInput}
        />
      </Box>
      <Box sx={{py:1}}>
        <TextField 
        error={emailError} 
        label="Email" 
        name='email' 
        fullWidth 
        helperText={emailErrorMessage}
        onChange={handleInput}
        />
      </Box>
      <Box sx={{py:1}}>
        <TextField 
        label="Password" 
        error={passwordError} 
        name='password' 
        fullWidth 
        helperText={passwordErrorMessage}
        onChange={handleInput}
        />
      </Box>
      <Box sx={{py:2}}  >
        <LoadingButton type='submit' fullWidth variant='contained'>
Signin
        </LoadingButton>
      </Box>
      <Typography sx={{py:2,textAlign:'center'}}>
        Don't have an account? <Link>Sign In</Link>
      </Typography>
    </Card>
  )
}

export default SignUp