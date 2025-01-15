import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



export default function Content() {
  return (
    <Stack
      sx={{ display:{xs:'none',md:'block'}, flexDirection: 'column',position:'relative', alignSelf: 'center', gap: 4, maxWidth: 500 }}
    >
      <Typography variant='h4' color='primary' sx={{textAlign:'center',width:'100%',fontWeight:'bold'}}> Welcome Back!</Typography>
      <img src='./pic.gif' alt='not found' style={{borderRadius:5,width:330,height:330}}/>
      {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <ConstructionRoundedIcon />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))} */}
    </Stack>
  );
}