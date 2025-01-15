import { createSlice } from "@reduxjs/toolkit";
import { Seller } from "./interface/authInterface.ts";
import toast from "react-hot-toast";
import { getSellerRequest } from "../actions/sellerActions.ts";




const initialState: Seller = {
    loading: false,
    error: false,
    count:0,
    errorMessage: null,
    sellers: null,
}
const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = false
            state.errorMessage = null
        }
    },
    extraReducers: (build) => {
        build//add review in reducers
            .addCase(getSellerRequest.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(getSellerRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    sellers: action.payload.seller,
                    count:action.payload.count
                }
            })
            .addCase(getSellerRequest.rejected, (state, action) => {
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


const { reducer } = sellerSlice
export const { clearError:clearSellerError } = sellerSlice.actions
export default reducer