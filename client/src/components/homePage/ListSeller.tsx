import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import StorefrontIcon from '@mui/icons-material/Storefront';
import   IconButton  from '@mui/material/IconButton';
import { Link } from "react-router-dom"
const ListSeller = ({s,openDialog,setOpenDialog,setSellerReview}) => {

  
  return (
    <Card>
    <CardHeader
      avatar={
        <Avatar variant='rounded'>
          <StorefrontIcon />
        </Avatar>
      }
      title={s.name}
      subheader={<Rating readOnly size='small' value={s.rating} />}
    />

    <Stack direction={'row'} justifyContent={'space-between'} px={2} py={1}>
      <Badge badgeContent={s.reviews?.length} color={'warning'} >
        <Tooltip title={`${s.reviews?.length} Review found`} placement="top-start" >

          <IconButton onClick={() =>{
          setOpenDialog(!openDialog);setSellerReview(s)
          } }>
            <ReviewsOutlinedIcon />
          </IconButton>

        </Tooltip ></Badge>
      <Box><Link to={`/${s._id}`}>See more</Link></Box>
    </Stack>
  </Card>
  )
}

export default ListSeller