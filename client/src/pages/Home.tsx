import React, { FormEvent, Fragment, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import Hero from '../components/hero/Hero.tsx';
import Page from '../components/pagination/Page.tsx';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import useSellerStore from '../store/useSellerStore.ts';
import {  useLocation } from "react-router-dom"
import ListSeller from '../components/homePage/ListSeller.tsx';
import ReviewDialogPopUp from '../components/reviewComponents/reviewDialog.tsx';

const Home = () => {

  const { getSeller, seller: originalSeller, isGettingSeller, count } = useSellerStore()


  const sellersPerPage: number = 8
  const [keyword, setKeyWord] = useState("")
  const [sellerReview, setSellerReview] = useState()
  const [openDialog, setOpenDialog] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(0)
  let totalPages: number = Math.ceil(count / sellersPerPage);
  const location = useLocation()



  //getting value from child component
  const getValuesFromInput = (s: string) => {
    //console.log(keyword);
    setKeyWord(s)
  }

  //getting the sellers by search
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getSeller({ currentPage, keyword })
  }

  //calling the get seller function to fetch sellers from database
  useEffect(() => {
    getSeller({ currentPage, keyword })
  }, [location.pathname,currentPage,getSeller,keyword])

  useEffect(() => {
    if (currentPage) getSeller({ currentPage, keyword })
  }, [currentPage,getSeller,keyword])

  useEffect(() => {
    //totalPages = Math.ceil(count / sellersPerPage)
    if (totalPages === 1) setCurrentPage(1)
  }, [count,totalPages])

 
  
  return (
    <Fragment>
      <Hero handleSubmit={handleSubmit} getValues={getValuesFromInput} />
      <Divider sx={{ py: 3, width: '80%', mx: "auto" }}><Typography>Availible sellers</Typography></Divider>
      <Grid container spacing={2} px={3} py={2} id='hero'>
        {
          isGettingSeller?(
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'}py={11}>
            <CircularProgress/>
         </Box>
          ): <Fragment>
          {
          Array.isArray(originalSeller) && originalSeller.length>0?originalSeller.map((s, i) => {
            return <Grid key={i + 1} size={{ sm: 4, md: 3, xs: 12 }}>
              <ListSeller s={s} setOpenDialog={setOpenDialog} openDialog={openDialog} setSellerReview={setSellerReview} />
            </Grid>
          }):<Typography sx={{mx:'auto',py:6}} variant='h5' fontWeight={'bold'}>No sellers Found !</Typography>
          }
            </Fragment>
        }
       
          
      </Grid>
      <Page currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      <ReviewDialogPopUp sr={sellerReview} openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </Fragment>
  )
}

export default Home








  /*Search effect */
  // useEffect(()=>{
  //   // if(isGettingSeller){
  //   //   setSeller(originalSeller)
  //   //   return
  //   // }
  //   const handleSearch=()=>{
  //     if(originalSeller){
  //       setSeller(originalSeller)
  //     const filteredSeller=originalSeller.filter(s=>s.name.includes(keyword))
  //     setSeller(filteredSeller)
  //     }
  //   }
  //   handleSearch()
  // },[keyword,originalSeller,isGettingSeller])