import  Typography  from '@mui/material/Typography'
import  DialogContentText from '@mui/material/DialogContentText'
import  Box from '@mui/material/Box'
import React from 'react'
import ReviewList from './ReviewList.tsx'

const Review = ({ review }) => {



    return (
        review.length>0?(
            review?.map(c => {
            return (<Box key={c._id}>
                <DialogContentText component={'div'} key={c.text} id="scroll-dialog-description">
                        <ReviewList c={c} />
                </DialogContentText>
            </Box>)
        })
        ):(
            <DialogContentText display={'flex'} justifyContent={'center'} py={20} component={'div'}  id="scroll-dialog-description">
            <Typography variant='h6'>No reviews found !</Typography>
            </DialogContentText>
        )
        

    )
}

export default Review