import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuButtons from './MenuButtons.tsx';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Typography } from '@mui/material';


const SideMenu=({openMenu,setOpenMenu})=> {



  return (
      <Drawer open={openMenu} >
       <Box p={1}py={2}>
        <Typography variant='h5' fontWeight={500}>
            Hello 
            <Typography component={'span'} variant='subtitle1' ml={1}>Mohamed Fazil !</Typography>
        </Typography>
       </Box>
       <Divider /> 
        <MenuButtons/>
        <Box p={1}>
        <Button onClick={()=>setOpenMenu(!openMenu)} fullWidth variant='outlined' color='error' startIcon={<HighlightOffIcon/>}>Close</Button>
        </Box>
      </Drawer>
  );
}

export default SideMenu