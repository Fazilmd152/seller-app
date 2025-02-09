import React, { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { visuallyHidden } from '@mui/utils';


export default function Hero({getValues,handleSubmit}) {

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        getValues(event.target.value)
    }

    return (
        <Box >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { md: 5, xs: 4, sm: 8 },
                    
                }}
            >
                <Stack
                component={'form'}
                onSubmit={handleSubmit}
                    spacing={2}
                    useFlexGap
                    sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
                >
                    <Typography id="hero"
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            fontSize: 'clamp(3rem, 10vw, 3.5rem)',
                        }}
                    >
                        Find&nbsp;latest&nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{ fontSize: 'inherit', color: 'primary.main', fontWeight: "500" }}
                        >
                            Sellers
                        </Typography>
                    </Typography>
                   
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        useFlexGap
                        sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
                    >
                        <InputLabel htmlFor="seller" sx={visuallyHidden}>
                            Search
                        </InputLabel>
                        <TextField
                        sx={{position:'sticky',top:2}}
                            id="seller"
                            hiddenLabel
                            size="small"
                            variant="outlined"
                            aria-label="Enter your email address"
                            placeholder="Search sellers"
                            fullWidth
                            onChange={handleInput}
                        />
                        <Button
                        type='submit'
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ minWidth: 'fit-content' }}
                        >
                            <SearchIcon />
                        </Button>
                    </Stack>
                  
                </Stack>
               
            </Container>
        </Box>
    );
}
