import { Logout } from '@mui/icons-material'
import {  Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppDispatch, useAppSelector } from '../../../customHooks/reduxHooks.ts'
import { changePasswordRequest, logOut } from '../../../redux/actions/authActions.ts';
import LoadingButton from '@mui/lab/LoadingButton';
import { ChangePassword } from '../../../InterfaceModels/userInterfaceModels.ts';
import { useNavigate } from 'react-router-dom';

const PopUp = ({anchorEl,handleClose,open}) => {
const {user,loading}=useAppSelector(state=>state.authState)


const [formdata,setFormdata]=useState<ChangePassword>({password:"",newPassword:""})

const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
  setFormdata({ ...formdata, [e.target.name as keyof typeof formdata]: e.target.value });
}
//
const dispatch=useAppDispatch()
const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  dispatch(changePasswordRequest(formdata))
}

const navigate=useNavigate()

  return (
    <Menu
   
    anchorEl={anchorEl}
    id="account-menu"
    open={open}
   //onClose={handleClose}
    //onClick={handleClose}
    slotProps={{
      paper: {

        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 20,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      },
    }}
    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
  >
    <MenuItem  sx={{fontWeight:'500'}} onClick={handleClose}>
       Back  <ArrowForwardIcon/>
    </MenuItem>
    <MenuItem  >
      <Avatar sx={{bgcolor:'success.main'}}/>{user?.name}
    </MenuItem>
    <Divider />
   
    <Box p={1} >
    <Accordion  sx={{border:1,minWidth:{sm:'350px',xs:'280px'},maxWidth:'500px'}}>
        <AccordionSummary
      
          expandIcon={<ExpandMoreIcon
             />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Change Password</Typography>
        </AccordionSummary>
        <form onSubmit={handleSubmit}>
        <AccordionDetails sx={{py:1}}>
        <TextField fullWidth name='password' label="Password" onKeyDown={(e) => e.stopPropagation()} onChange={handleInput} 
         id="standard-basic"  variant="standard" /><br></br>
        </AccordionDetails>
        <AccordionDetails sx={{py:1}}>
        <TextField fullWidth name='newPassword' onKeyDown={(e) => e.stopPropagation()} label="New Password" onChange={handleInput}   
        id="standard-basic"  variant="standard" />
        </AccordionDetails>
        <AccordionActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton loading={loading} type='submit'>Submit</LoadingButton>
        </AccordionActions>
        </form>
      </Accordion>
    </Box>
    <MenuItem onClick={()=>{
      dispatch(logOut())
      navigate('/signin')
      }}>
      <ListItemIcon >
        <Logout fontSize="small" color='error' />
      </ListItemIcon>
      Logout
    </MenuItem>
  </Menu>
  )
}

export default PopUp

