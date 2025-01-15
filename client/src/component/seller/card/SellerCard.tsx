import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import Avatar from '@mui/material/Avatar';
import {Assignment} from '@mui/icons-material';
import { Badge,IconButton,Rating} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import SpeedDialComponent from '../speedDial/SpeedDialComponent.tsx';
import Date from '../../../customHooks/dateFormat.ts';
import { useAppDispatch } from '../../../customHooks/reduxHooks.ts';
import { setId, setSeller } from '../../../redux/slices/commentState.ts';



export default function SellerCard({seller,loading,commentDialog, setCommentDialog,reviewDialog,setReviewDialog }) {
const dispatch=useAppDispatch()

const handleClick=()=>{
  dispatch(setId(seller._id))
  dispatch(setSeller(seller))
  setCommentDialog(!commentDialog)
}



  return (

    <>
    <Card sx={{ position: 'relative', p:false?2:0 }}>
          <>
          <CardHeader avatar={
            <Avatar sx={{bgcolor:'green'}}  variant="square" aria-label="seller">
              <Assignment/>
            </Avatar>
          }
          sx={{ py: 0, pt: 2 }}
          title={seller.name}
          subheader={new Date(seller.createdAt).getJoinedSince()}
        />
        <CardActions disableSpacing sx={{ justifyContent: 'space-between', pr: 2 }}>
          <SpeedDialComponent seller={seller} reviewDialog={reviewDialog} setReviewDialog={setReviewDialog}/>
          <Badge badgeContent={seller.reviews.length} color={'warning'} sx={{ position: 'absolute', top: 15, right: 13 }}>
            <Tooltip title="Total reviews" placement="top-start" >
              <IconButton onClick={handleClick}>
              <ReviewsOutlinedIcon />
                </IconButton>
            </Tooltip>
          </Badge>
          <Rating name="read-only" value={3}  readOnly size='small' />
        </CardActions>
        </>
    </Card>
   
    </>
  );
}
