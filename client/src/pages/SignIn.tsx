import Box from '@mui/material/Box'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import  Typography  from '@mui/material/Typography'
import  TextField from '@mui/material/TextField'
import  Card  from '@mui/material/Card'
import  Link  from '@mui/material/Link'
import LoadingButton from '@mui/lab/LoadingButton'
import useAuthStore from '../store/useAuthStore.ts'
import  CardActions  from '@mui/material/CardActions'

const SignIn = () => {

  const [formData,setFormData]=useState<{email:string,password:string}>({email:"",password:""})
 
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  const validateForm = () => {
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

const {signIn ,authUser,isLoggingIn}=useAuthStore()


const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValidate = validateForm()
 if (!isValidate === true) return
      signIn(formData)
    setEmailError(false)
    setPasswordError(false)
}
if(authUser)console.log(authUser)

const handleInput=(e:ChangeEvent<HTMLInputElement>)=>{
  setFormData({...formData,[e.target.name]:e.target.value})
}

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
    }}
    >
      <Box>
        <Typography
        component="h1"
        variant="h4"
        sx={{py:2, color: 'black', width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)',fontWeight:'bold' }}
        >Sign In</Typography>
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
      <CardActions sx={{py:2}}  >
        <LoadingButton loading={isLoggingIn} type='submit' fullWidth variant='contained'>
Signin
        </LoadingButton>
      </CardActions>
      <Typography sx={{py:2,textAlign:'center'}}>
        Don't have an account? <Link>Sign up</Link>
      </Typography>
    </Card>
  )
}

export default SignIn