import { createSlice } from "@reduxjs/toolkit";
import { deleteReviewRequest, editReviewRequest, postReviewRequest } from "../actions/reviewAction.ts";
import { Review } from "./interface/authInterface.ts";
import toast from "react-hot-toast";




const initialState: Review = {
    loading: false,
    error: false,
    count: 0,
    fulfilled: null,
    errorMessage: null,
    review: null,
}
const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = false
            state.errorMessage = null
        },
        clearFulfilled: (state) => {
            state.fulfilled = null
        }
    },
    extraReducers: (build) => {
        build//add review in reducers
            .addCase(postReviewRequest.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                    fulfilled: null
                }
            })
            .addCase(postReviewRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    review: action.payload.review,
                    fulfilled: true
                }
            })
            .addCase(postReviewRequest.rejected, (state, action) => {
                toast.error(action.payload)
                return {
                    ...state,
                    loading: false,
                    error: true,
                    fulfilled: null,
                    errorMessage: typeof action.payload === 'string' ? action.payload : null
                }
            })
            //add review in reducers
            .addCase(editReviewRequest.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(editReviewRequest.fulfilled, (state, action) => {
                toast.success("Review has been updated succesfully")
                return {
                    ...state,
                    loading: false,
                    review: action.payload.review
                }
            })
            .addCase(editReviewRequest.rejected, (state, action) => {
                toast.error(action.payload)
                return {
                    ...state,
                    loading: false,
                    error: true,
                    fulfilled: null,
                    errorMessage: typeof action.payload === 'string' ? action.payload : null
                }
            })//add review in reducers
            .addCase(deleteReviewRequest.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteReviewRequest.fulfilled, (state, action) => {
                toast.success("Review has been deleted succesfully")
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(deleteReviewRequest.rejected, (state, action) => {
                toast.error(action.payload)
                return {
                    ...state,
                    loading: false,
                    error: true,
                    fulfilled:null,
                    errorMessage: typeof action.payload === 'string' ? action.payload : null
                }
    })
    }

})


const { reducer } = reviewSlice
export const { clearFulfilled, clearError: clearReviewError } = reviewSlice.actions
export default reducer