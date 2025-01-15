import React, { ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { SignInModel } from '../../../../InterfaceModels/userInterfaceModels.ts';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from '../../../../customHooks/reduxHooks.ts';
import { signInRequest } from '../../../../redux/actions/authActions.ts';
import { clearError } from '../../../../redux/slices/authSlice.ts';
import { Tab, Tabs, Tooltip } from '@mui/material';
import {  useNavigate } from 'react-router-dom';


const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInCard = () => {

    //getting redux states
    const { loading, isAuthenticated }
        = useAppSelector(state => state.authState)

    const dispatch = useAppDispatch()

    //useState variables for error validation and formData
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
    const [formData, setFormData] = useState<SignInModel>({ email: "", password: "" })

    //handling input values
    const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    //validating the inputs before sending requests
    const validateInputs = (): boolean | SignInModel => {
        let regex = /\S+@\S+\.\S+/
        if (!regex.test(formData.email)) {
            setEmailError(true)
            setEmailErrorMessage("Enter valid email")
            return false
        }
        if (formData.password.length < 6) {
            setPasswordError(true)
            setPasswordErrorMessage("Password must be greater than 5 caharacters")
            return false
        }
        let data: SignInModel = formData
        return data
    }

    //sending request
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = validateInputs()
        if (!data) return
        dispatch(signInRequest(formData))
        dispatch(clearError())
    }

    const navigate = useNavigate()
    useEffect((): void => {
        if (isAuthenticated) navigate("/")
        return;
    }, [isAuthenticated,navigate])

    return (
        <Card variant="outlined" id='hero'>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                {/* <Sear /> */}
            </Box>

            <Tabs
                value={true}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example">
                <Tab
                    value={true}
                    label={
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ color: 'black', width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                        >
                            Sign in
                        </Typography>
                    }>

                </Tab>
                <Tab
                    label={
                        <Link href="/signup" underline='none' color='inherit'><Tooltip title="Dont have an account? sign up" arrow><Typography
                            component="h5"
                            variant="h6"
                            sx={{ width: '100%', fontSize: 'clamp(0.50rem, 5vw, 1rem)' }}
                        >
                            Sign Up
                        </Typography></Tooltip></Link>
                    }>

                </Tab>
            </Tabs>

            <Box component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
            >
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="email"
                        type="email"
                        name="email"
                        value={formData?.email}
                        onChange={handleInput}
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormLabel htmlFor="password">Password</FormLabel>

                    </Box>
                    <TextField
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData?.password}
                        onChange={handleInput}
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControlLabel control={<Checkbox value="remember" color="primary" defaultChecked />}
                    label="Remember me"/>
                <LoadingButton type='submit' variant="contained" loading={loading}>
                    Sign in
                </LoadingButton>
               
            </Box>

        </Card>
    );
}

export default SignInCard