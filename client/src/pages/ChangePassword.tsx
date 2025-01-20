import Box from '@mui/material/Box'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import  Typography  from '@mui/material/Typography'
import  TextField from '@mui/material/TextField'
import  Card  from '@mui/material/Card'
import  Link  from '@mui/material/Link'
import LoadingButton from '@mui/lab/LoadingButton'
import useAuthStore from '../store/useAuthStore.ts'
import  CardActions  from '@mui/material/CardActions'

const ChangePassword = () => {

  const [formData,setFormData]=useState<{password:string,newPassword:string}>({password:"",newPassword:""})
 
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
    const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState<string>("");

  const validateForm = () => {
    //password
    if (!formData.password) {
      setPasswordError(true)
      setPasswordErrorMessage("Password is required to change");return
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
    //newPassword
    if (!formData.newPassword) {
        setPasswordError(true)
        setPasswordErrorMessage("New Password is required to change");return
      }else{
        setPasswordError(false)
        setPasswordErrorMessage("")
      }
      if (formData.newPassword.length < 6){ 
         setPasswordError(true)
         setPasswordErrorMessage("New Password must be at least 6 characters");return
      }else{
        setPasswordError(false)
        setPasswordErrorMessage("")
      }
    return true
}




const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValidate = validateForm()
 if (!isValidate === true) return
      //signIn(formData)
    setPasswordError(false)
    setNewPasswordError(false)
    setPasswordErrorMessage("")
    setNewPasswordErrorMessage("")
    
}

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
        error={passwordError} 
        label="Password" 
        name='password' 
        fullWidth 
        helperText={passwordErrorMessage}
        onChange={handleInput}
        />
      </Box>
      <Box sx={{py:1}}>
        <TextField 
        label="New Password" 
        error={newPasswordError} 
        name='newPassword' 
        fullWidth 
        helperText={newPasswordErrorMessage}
        onChange={handleInput}
        />
      </Box>
      <CardActions sx={{py:2}}  >
        <LoadingButton type='submit' fullWidth variant='contained'>
Submit
        </LoadingButton>
      </CardActions>
      
    </Card>
  )
}

export default ChangePassword