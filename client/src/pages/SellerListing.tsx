import Stack from '@mui/material/Stack'
import React, { FormEvent, useEffect, useState } from 'react'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import useSellerStore from '../store/useSellerStore.ts'
import {  useParams } from 'react-router-dom'
import useReviewStore from '../store/useReviewStore.ts'
import SingleSellerReview from '../components/sellerDetails/SingleSellerReview.tsx'
import PostReview from '../components/sellerDetails/PostReview.tsx'
import TabsButtons from '../components/sellerDetails/TabsButtons.tsx'
import AboutSellerSection from '../components/sellerDetails/AboutSellerSection.tsx'
import { Box, CircularProgress } from '@mui/material'
const SellerListing = () => {

    const { id } = useParams()
    const { singleSeller:seller, getSingleSeller } = useSellerStore()
    const [reviewTab, setReviewTab] = useState(false)
    const [postReviewTab, setPostReviewTab] = useState(true)

    const { postReview, getReview, review: reviews ,isDeletingReview,newReview,isEditingReview} = useReviewStore()

    useEffect(() => {
        getSingleSeller(id)
        getReview(id ?? "")  
    },[id,getSingleSeller,getReview,newReview,isDeletingReview,isEditingReview])

    useEffect(() => {
        getReview(id ?? "")
    }, [isDeletingReview,getReview,id,newReview])



    const [review, setReview] = useState<string>("")
    const [rating,setRating]=useState<number>(1)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() 
       if (review.length < 1) return
        postReview({ review,rating, sellerId: id ?? "" })
        setReview("");setRating(1)
    }

    if (!seller)
        return (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
          <CircularProgress/>
       </Box>
        )
  

    return (
        <Container>
            <AboutSellerSection name={seller.name} rating={seller.rating} />
            <Stack sx={{ mt: { xs: 1, sm: 3 } ,position:'relative'}} >
                <TabsButtons reiviewsLength={seller.reviews.length||0} reviewTab={reviewTab} setReviewTab={setReviewTab} postReviewTab={postReviewTab} setPostReviewTab={setPostReviewTab} />
                <Divider />
                <PostReview rating={rating} setRating={setRating} postReviewTab={postReviewTab} handleSubmit={handleSubmit} review={review} setReview={setReview} />

                <SingleSellerReview reviews={reviews} reviewTab={reviewTab} />

            </Stack>
        </Container>
    )
}

export default SellerListing