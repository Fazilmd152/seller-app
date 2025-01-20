import  Stack  from '@mui/material/Stack'
import Box from '@mui/material/Box'
import React from 'react'
import  TextField from '@mui/material/TextField'
import  Button  from '@mui/material/Button'
import RatingComponent from '../Rating/RatingComponent.tsx'
import useReviewStore from '../../store/useReviewStore.ts'
import LoadingButton from '@mui/lab/LoadingButton'

const PostReview = ({postReviewTab,handleSubmit,setReview,rating,setRating,review}) => {


  const {isPostingReview}=useReviewStore()

  return (
    <Stack
        component={'form'}
        onSubmit={handleSubmit}
        display={postReviewTab?"block":"none"}
        py={4}
        direction={'column'}
        alignItems={'center'}
        width={'fit-content'}
        mx={'auto'}
        >
            <TextField
            label='Write Review...'
            rows={4}
            multiline
            variant='outlined'
            value={review}
            sx={{width:{xs:350,sm:400,md:450}}}
            onChange={(e)=>setReview(e.target.value)}
            />
            <Box py={1}>
            <RatingComponent large readOnly={false}  getValue={setRating} rating={rating}/>
            </Box>
            <Box 
            sx={{
                display:'flex',
                justifyContent:'end',
                gap:2,
                p:1,
            }}
            >
            <Button variant='text' color='error'>Discard</Button>
            <LoadingButton loading={isPostingReview} variant='contained' type='submit'>Post</LoadingButton>
            </Box>
        </Stack> 
  )
}

export default PostReview