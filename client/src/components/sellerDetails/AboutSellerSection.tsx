import  Stack  from '@mui/material/Stack'
import React from 'react'
import  Typography  from '@mui/material/Typography'
import  Rating  from '@mui/material/Rating'
import { Link } from 'react-router-dom'
import { Breadcrumbs } from '@mui/material'

const AboutSellerSection = ({name,rating}) => {
  return (
    <Stack 
    sx={{
        pt:{xs:4,sm:2},
    }}>

<Breadcrumbs aria-label="breadcrumb" sx={{py:2}}>
  <Link to={'/'}>
    Home
  </Link>
  <Typography sx={{ color: 'text.primary' }}>About</Typography>
</Breadcrumbs>

        <Typography
        component={'h1'}
        variant='h4'
        fontWeight={'bold'}
        >
            {name}
        </Typography>
        <Rating value={rating||1} readOnly/>
        <Typography
        component={'h1'}
        variant='h5'
        sx={{
            mt:1,
            fontWeight:'500'
        }}
        >About</Typography>
        <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde itaque similique, modi, pariatur consequuntur beatae laborum, perferendis fugit sed repellat in eos assumenda qui error repudiandae? Amet laborum repellendus sit dolores? Facere, accusamus similique harum facilis a quisquam est dolorum dicta error quos minima ab enim quasi alias voluptatum quidem!</Typography>
    </Stack>
  )
}

export default AboutSellerSection