import React, { ChangeEvent, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Navbar from './component/Header/Navbar.tsx';
import SearchBar from './component/search/SearchBar.tsx';
import Hero from './component/hero/Hero.tsx';
import SellerCard from './component/seller/card/SellerCard.tsx';
import Grid from '@mui/material/Grid2';
import SellerSection from './component/seller/SellerSection.tsx';
import Page from './component/pagination/Page.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './layouts/HomePage.tsx';
import SignInPage from './layouts/SignInPage.tsx';
import { Toaster } from 'react-hot-toast'
import SignUpPage from './layouts/SignUpPage.tsx';
import ReviewDialogPopUp from './component/reviews/dialog/ReviewDialogPopUp.tsx';
import { useAppDispatch, useAppSelector } from './customHooks/reduxHooks.ts';
import { loadUser } from './redux/actions/authActions.ts';

function App() {

  const {isAuthenticated}=useAppSelector(state=>state.authState)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [])



  return (
    <Box sx={{
      width: '100%',
      position: 'relative',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
    }}>
     {isAuthenticated&&<Navbar />} 

      <Routes>
        <Route path='/' element={isAuthenticated?<HomePage/>:<Navigate to={'/signin'}/>} />
        <Route path='/signin' element={isAuthenticated?<Navigate to={'/'}/>:<SignInPage />} />
        <Route path='/signup' element={isAuthenticated?<Navigate to={'/'}/>:<SignUpPage />} />
      </Routes>

      <Toaster />
    </Box>
  );
}

export default App;
