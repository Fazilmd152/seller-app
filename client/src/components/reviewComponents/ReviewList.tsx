import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import RatingComponent from "../Rating/RatingComponent.tsx";

const ReviewList = ({ c }) => {


  return (
    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <ListItem sx={{ width: '100%' }}>
        <ListItemAvatar >
          <Avatar alt={c.postedBy.name} src="sdfdsf" />
        </ListItemAvatar>
        <Stack sx={{ width: '100%' }}>
          <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}alignItems={'center'}>
            <Box sx={{ display: { sm: 'flex' }, gap: { sm: 5 }, }}>
              <ListItemText primary={
                <Box alignItems={'center'} display={'flex'}gap={2}> 
                {c.postedBy.name}
               <RatingComponent readOnly={true} rating={4}/>
                </Box>
                } secondary={c.text} ></ListItemText>
</Box>
                  
          </Stack>
           {/* <ListItemText secondary={c.text} />  */}
        </Stack>
      </ListItem>
      <Divider variant="inset" component="li" />

    </List>
  );
}

export default ReviewList