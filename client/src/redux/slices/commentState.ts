import { createSlice } from "@reduxjs/toolkit";

interface CommentStateModel {
    sellerId: string | null;
    seller: {
      _id: string;
      seller: string;
      name: string;
      reviews: {
        _id: string;
        postedBy: {
          _id: string;
          name: string;
          createdAt: string;
        };
        text: string;
        rating: number;
      }[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    } | null;
  }
  

const initialState:CommentStateModel={
    sellerId:null,
    seller:null 

}

const commentState=createSlice({
name:'state',
initialState,

reducers:{
    setId:(state,action)=>{
         state.sellerId=action.payload
    },
    setSeller:(state,action)=>{
       state.seller=action.payload
       console.log(state.seller);
       
    }
}
})

const {reducer}=commentState
export const {setId,setSeller}=commentState.actions
export default reducer