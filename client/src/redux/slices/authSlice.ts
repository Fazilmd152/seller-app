import { createSlice } from "@reduxjs/toolkit";
import { changePasswordRequest, loadUser, logOut, signInRequest, signUpRequest } from "../actions/authActions.ts";
import { Auth } from "./interface/authInterface.ts";
import toast from "react-hot-toast";




const initialState: Auth = {
    loading: false,
    isAuthenticated: false,
    error: false,
    errorMessage: null,
    user: null,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = false
            state.errorMessage = null
        }
    },
    extraReducers: (build) => {
        build//sign in reducers
            .addCase(signInRequest.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(signInRequest.fulfilled, (state, action) => {
                toast.success("Signed in sccessfully")
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: true,
                    user: action.payload.user
                }
            })
            .addCase(signInRequest.rejected, (state, action) => {
                toast.error(action.payload)
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errorMessage: typeof action.payload === 'string' ? action.payload : null
                }
            })//signup reducers
            .addCase(signUpRequest.pending,(state,action)=>{
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(signUpRequest.fulfilled,(state,action)=>{
                toast.success("account created sccessfully")
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: true,
                    user: action.payload.user
                }
            })
            .addCase(signUpRequest.rejected, (state, action) => {
                toast.error(action.payload)
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errorMessage: typeof action.payload === 'string' ? action.payload : null
                }
            })//load user
            .addCase(loadUser.pending,(state,action)=>{
                return {
                    ...state,
                    loading:true
                }
            })
            .addCase(loadUser.fulfilled,(state,action)=>{
                return {
                    ...state,
                    loading:false,
                    user:action.payload.user,
                    isAuthenticated:true
                }
            })
            .addCase(loadUser.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errorMessage: typeof action.payload === 'string' ? action.payload : null
                }
            })
            //change password user
            .addCase(changePasswordRequest.pending,(state,action)=>{
                return {
                    ...state,
                    loading:true
                }
            })
            .addCase(changePasswordRequest.fulfilled,(state,action)=>{
                toast.success("Password has been changed")
                return {
                    ...state,
                    loading:false,
                }
            })
            .addCase(changePasswordRequest.rejected, (state, action) => {
                toast.error(action.payload)
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errorMessage: typeof action.payload === 'string' ? action.payload : null
                }
            })
             //logout user
             .addCase(logOut.pending,(state,action)=>{
                return {
                    ...state,
                    loading:true
                }
            })
            .addCase(logOut.fulfilled,(state,action)=>{
                toast.success("Signed out succesfully")
                return {
                    ...state,
                    loading:false,
                    isAuthenticated:false
                }
            })
            .addCase(logOut.rejected, (state, action) => {
                toast.error(action.payload)
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errorMessage: typeof action.payload === 'string' ? action.payload : null
                }
            })
    }

})


const { reducer } = authSlice
export const { clearError } = authSlice.actions
export default reducer