import React from 'react'
import  List from '@mui/material/List'
import  Stack  from '@mui/material/Stack'
import ListReviews from './ListReviews.tsx'
import { Box, Typography } from '@mui/material'

const SingleSellerReview = ({reviews,reviewTab}) => {
  return(
    <Stack
    sx={{
     display:reviewTab?"block":"none",
     width:{sm:'fit-content'},
     maxWidth:{sm:'500px'},
     mx:{sm:'auto',md:0}
    }}
     >
      {
            reviews?.length>0?(
              <List>
         {
             reviews?.map(d=>{
                 return <ListReviews key={d._id} d={d}/>
             })
         }
        </List>
            ):(
              <Typography
            width={280}
            fontWeight={'500'}
             textAlign={'center'}
             variant='h5'
             sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%, 100%)'
             }}
             >No reviews found be the first one to review !</Typography>
            )
      }
        
     </Stack>
  ) 
}
  
 
  


export default SingleSellerReview