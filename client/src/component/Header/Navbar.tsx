import { AppBar, Avatar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PopUp from './popUpMenu/PopUp.tsx'
import { useAppSelector } from '../../customHooks/reduxHooks.ts'


const Navbar = () => {

  const{user}=useAppSelector(state=>state.authState)
  const location = useLocation()
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isHomePage=location.pathname !== '/'


  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isHomePage) return
    const handleScroll = (): void => {
      if (window.scrollY >= (document.querySelector<Element>('#hero') as HTMLElement).offsetTop - 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage,location]);

  return (
    <>
      <AppBar position={!isHomePage?'sticky':'static'} color={'inherit'}
        sx={{
          boxShadow: 0,
          bgcolor: scrolled ? 'white' : 'transparent',
          backgroundImage: 'none',
        }}>
        <Toolbar variant="dense" sx={{justifyContent:'center',gap:5,py:2,position:'relative'}}>
          <Typography variant="h5" color="inherit" component="div" sx={{ fontWeight: '600' }}>
            Seller app
          </Typography>

            <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            edge="end" 
            color="inherit" 
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            aria-label="account-menu" 
            size="small"
            sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 ,bgcolor:'gray'}}  alt={user?.name}/>
          </IconButton>
        </Tooltip>
      <PopUp anchorEl={anchorEl} handleClose={handleClose} open={open}/>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar