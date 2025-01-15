import React from 'react'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const ReadOnlyRating = ({rating}) => {
    
    return (
        <>
            {/* <Typography component="legend">Read only</Typography> */}
            <Rating name="read-only" value={rating} readOnly size='small' />
        </>
    )
}

export default ReadOnlyRating