import { createAsyncThunk } from '@reduxjs/toolkit'
import { ChangePassword, SignInModel, SignUpModel } from '../../InterfaceModels/userInterfaceModels.ts'
import axio from '../instance/axiosInstance.ts'

//signin request
export const signInRequest = createAsyncThunk("signin", async function (args: SignInModel, { rejectWithValue }) {
  try {
    const { data } = await axio.post("/auth/signin", args)
    return data
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})


//signup request
export const signUpRequest = createAsyncThunk("signup", async function (args: SignUpModel, { rejectWithValue }) {
  try {
    const { data } = await axio.post("/auth/signup", args)
    return data
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

//signup request
export const loadUser = createAsyncThunk("getme", async function (_, { rejectWithValue }) {
  try {
    const { data } = await axio.get("/auth/getme")
    return data
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})


//change password request 
export const changePasswordRequest = createAsyncThunk("changePassword", async function (args: ChangePassword, { rejectWithValue }) {
  try {
    const { data } = await axio.put("/auth/changepassword", args)
    return data
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})


//sign out
export const logOut = createAsyncThunk("logout", async function (_, { rejectWithValue }) {
  try {
    const { data } = await axio.get("/auth/signout")
    return data
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
}) 