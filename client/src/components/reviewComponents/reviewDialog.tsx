import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import Review from './Review.tsx';
import SendIcon from '@mui/icons-material/Send';
import useReviewStore from '../../store/useReviewStore.ts';
import LoadingButton from '@mui/lab/LoadingButton';
const ReviewDialogPopUp = ({ openDialog, setOpenDialog, sr }) => {

  interface Review {
    _id: string;
    sellerId: string;
    postedBy: {
      _id: string;
      name: string;
      createdAt: string;
    };
    text: string;
    rating:string;
  }
  
  const [review, setreview] = useState<Review[]>(sr)
  const [addReview, setAddReview] = useState<boolean>(false)
  const [text, setText] = useState("")

  useEffect(() => {
    if (sr) setreview(sr.reviews)
  }, [sr])
const {postReview,isPostingReview,newReview}=useReviewStore()

  const handleSumit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    postReview({review:text,sellerId:sr._id,rating:2})
  }

  useEffect(()=>{
    if(newReview){
      setreview([newReview,...review])
      setAddReview(false)
    }
  },[newReview])


  return (
    <Dialog
      open={openDialog}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"

    >
      <DialogTitle id="scroll-dialog-title" >Reviews </DialogTitle>
      <DialogContent
        sx={{
          height: '400px',
          minWidth: { xs: 300, sm: 400, md: 500 },
          p: 0
        }}
      >

        <Review review={review} />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        {
          !addReview ? (
            <>
              <Button onClick={() => setOpenDialog(!openDialog)}>Close</Button>
              <Button variant='contained' onClick={() => setAddReview(!addReview)}>Add review</Button>
            </>
          ) : (
            <Box component={'form'} display={'flex'} width={'100%'} gap={1} flexDirection={'row'} onSubmit={handleSumit}>
              <TextField variant='outlined' onChange={(e) => setText(e.target.value)} size="small" placeholder='Write Review' fullWidth />
              <LoadingButton  loading={isPostingReview} type='submit' sx={{ bgcolor: isPostingReview?"none":"primary.main" }}>
                <SendIcon sx={{ color: 'white' }} />
              </LoadingButton>

              <Button onClick={() => setAddReview(!addReview)}>Discard</Button>
            </Box>
          )
        }


      </DialogActions>
    </Dialog>
  )
}

export default ReviewDialogPopUp