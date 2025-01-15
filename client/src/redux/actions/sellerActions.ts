import { createAsyncThunk } from '@reduxjs/toolkit'
import axio from '../instance/axiosInstance.ts'

interface Args{keyword?:string,currentPage:number}
//add review request
export const getSellerRequest = createAsyncThunk("getSeller", async function (args:Args, { rejectWithValue }) {
  try {
    const { keyword, currentPage } = args
    let link = `seller/?page=${currentPage | 1}`
    if (keyword)
      link += `&keyword=${keyword}`
    const { data } = await axio.get(link)
    return data
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
}) 