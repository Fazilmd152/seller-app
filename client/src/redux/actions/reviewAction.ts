import {createAsyncThunk} from '@reduxjs/toolkit'
import {EditReviewModel, ReviewModel} from '../../InterfaceModels/userInterfaceModels.ts'
import axio from '../instance/axiosInstance.ts'

//add review request
export const postReviewRequest=createAsyncThunk("addreview",async function(args:ReviewModel,{rejectWithValue}){
  try {
    const {sellerId} =args
    console.log(sellerId);
    
    const {data} = await axio.post(`/review//${sellerId}`,args)
    return data
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
}) 


//edit review request
export const editReviewRequest=createAsyncThunk("editreview",async function(args:EditReviewModel,{rejectWithValue}){
  try {
    const {reviewId} =args
    
    const {data} = await axio.put(`/review/${reviewId}`,args)
    return data
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
}) 


//delete review request
export const deleteReviewRequest=createAsyncThunk("deletereview",async function(args:string,{rejectWithValue}){
  try {  
    const {data} = await axio.delete(`/review/${args}`)
    return data
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
}) 

