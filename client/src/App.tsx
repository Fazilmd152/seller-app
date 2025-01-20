import React, {  useEffect } from 'react';
import Box from '@mui/material/Box';
import Navbar from './components/Header/Navbar.tsx';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import SellerListing from './pages/SellerListing.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import Home from './pages/Home.tsx';
import useAuthStore from './store/useAuthStore.ts';
import  CircularProgress from '@mui/material/CircularProgress';

function App() {

  const { loadUser,isAuthenticated,isCheckingAuth,authUser} = useAuthStore()
  const location=useLocation()
    useEffect(() => {
         loadUser()
    }, [location.pathname,loadUser])
    useEffect(() => {
      if(!isAuthenticated)loadUser()
    }, [isAuthenticated,loadUser])

    if (isCheckingAuth && !authUser)
      return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
        <CircularProgress/>
     </Box>
      )

  return (
    <Box sx={{
      width: '100%',
      display:'grid',
      //placeContent:'center',
     // height:'100vh',
      position: 'relative',
      backgroundRepeat: 'no-repeat',
     // backgroundImage:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(187,172,83,1) 0%, rgba(71,206,212,0.6756827731092436) 100%)',
     //backgroundImage:'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(187,172,83,1) 0%, rgba(71,206,212,0.6756827731092436) 100%)',
      backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
    }}><Navbar />
     {/* {isAuthenticated&&<Navbar />} 

      <Routes>
        <Route path='/' element={isAuthenticated?<HomePage/>:<Navigate to={'/signin'}/>} />
        <Route path='/signin' element={isAuthenticated?<Navigate to={'/'}/>:<SignInPage />} />
        <Route path='/signup' element={isAuthenticated?<Navigate to={'/'}/>:<SignUpPage />} />
      </Routes>

       */}
       <Routes>
        <Route path='/' element={isAuthenticated?<Home/>:<Navigate to={'/signin'}/>} />
        <Route path='/:id' element={isAuthenticated?<SellerListing/>:<Navigate to={'/signin'}/>} />
        <Route path='/signin' element={isAuthenticated?<Navigate to={'/'}/>:<SignIn/>} />
        <Route path='/signup' element={isAuthenticated?<Navigate to={'/'}/>:<SignUp/>} />
      </Routes>
      
      <Toaster />
    </Box>
  );
}

export default App;
