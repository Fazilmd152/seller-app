import { Stack } from '@mui/material';
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton';
import React from 'react'

const Skeletons = () => {
    return (
<>
    {Array.from({ length: 8 }, (_, index)=> (
        <Box key={index}>
        <Stack direction={'row'} gap={2} alignItems={'center'} mb={1}>
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Box width={'100%'}>
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="40%" />
        </Box>
        </Stack>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
    </Box>
    ))}
</>
        
    )
}

export default Skeletons