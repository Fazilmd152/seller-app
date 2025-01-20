import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SideMenu from './SideMenu.tsx'
import MenuIcon from '@mui/icons-material/Menu';
import useAuthStore from '../../store/useAuthStore.ts';


const Navbar = () => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const isHomePage=location.pathname !== '/'
  const {isAuthenticated}=useAuthStore()



  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if(!isAuthenticated){
      setOpenMenu(false)
      return
    }
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
  }, [isHomePage,location,isAuthenticated]);

  return (
    <>
      <AppBar position={!isHomePage?'sticky':'static'} color={'inherit'}
        sx={{
          boxShadow: 0,
          bgcolor: scrolled ? 'white' : 'transparent',
          backgroundImage: 'none',
        }}>
         <Toolbar variant="dense">
    <IconButton edge="start" color="inherit"  sx={{ mr: 2 ,display:isAuthenticated?'':'none' }} onClick={handleOpenMenu}>
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" color="inherit" component="div">
      Photos
    </Typography>
  </Toolbar>
  <SideMenu openMenu={openMenu}setOpenMenu={setOpenMenu}/>
      </AppBar>
    </>
  )
}

export default Navbar