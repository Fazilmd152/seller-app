import { create } from "zustand";
import axio from './instance/axiosInstance.ts'
import { ReviewStore } from "./interface/Interface.ts";
import toast from "react-hot-toast";

const useReviewStore = create<ReviewStore>((set, get) => ({
    newReview:null,
    review: null,
    editedReview:null,
    isGettingReview: false,
    isPostingReview:false,
    isEditingReview:false,
    isDeletingReview:false,

    postReview: async (args) => {
        set({ isPostingReview: true })
        try {
            const {sellerId} =args
             const {data} = await axio.post(`/review/${sellerId}`,args)
            set({newReview:data.data})
            toast.success("Review has been added")
          } catch (error) {
            toast.error(error.response.data.message)
             } finally {
            set({ isPostingReview: false })
        }
    },

    getReview: async (args) => {
        set({ isGettingReview: true })
        try {
             const {data} = await axio.get(`/review/${args}`)
            set({review:data.review})
          } catch (error) {
            toast.error(error.response.data.message)
             } finally {
            set({ isGettingReview: false })
        }
    },

    editReview:async (args)=>{
        try {
            set({isEditingReview:true})
            const {reviewId} =args
            const {data} = await axio.put(`/review/${reviewId}`,args)
             set({editedReview:data.data})
            set({isEditingReview:false})
            toast.success("Review has been edited")
          } catch (error) {
            toast.error(error.response.data.message)
          }finally{
            set({isEditingReview:false})
          }
    },

    deleteReview:async (args:string)=>{
        try {  
            set({isDeletingReview:true})
         await axio.delete(`/review/${args}`)
            toast.success("Review deleted succesfully")
          } catch (error) {
            toast.error(error.response.data.message)
          }finally{
            set({isDeletingReview:false})
          }
    }


}))

export default useReviewStore