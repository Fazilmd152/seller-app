import React from 'react'
import  Typography  from '@mui/material/Typography'
import  Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Badge } from '@mui/material'

const TabsButtons = ({reviewTab,setReviewTab,setPostReviewTab,postReviewTab,reiviewsLength}) => {
  return (
    <Tabs 
        value={true}
        sx={{
            mx:{md:0,sm:'auto',xs:'none'},
            position:'sticky',
            top:2,
            bgcolor:'white',
            zIndex:20
        }}
        >
            <Tab
            onClick={()=>{
                setReviewTab(!reviewTab)
                setPostReviewTab(!postReviewTab)
            }}
            value={postReviewTab}
            label={
            <Typography
            component={'h4'}
            >Post review</Typography>
        }
            >
            </Tab>
            <Tab
            onClick={()=>{
                setReviewTab(!reviewTab)
                setPostReviewTab(!postReviewTab)
            }}
            value={reviewTab}
            label={
                <Badge badgeContent={reiviewsLength} color='primary'>
            <Typography
            component={'h4'}
            >reviews</Typography>
            </Badge>
        }
            >
            </Tab>
        </Tabs>
  )
}

export default TabsButtons