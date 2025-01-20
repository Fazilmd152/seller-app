import { create } from "zustand";
import { SellerStore } from "./interface/Interface.ts";
import axio from './instance/axiosInstance.ts'

const useSellerStore = create<SellerStore>((set, get) => ({

    seller: null,
    isGettingSeller: false,
    gettingSingleSeller:false,
    singleSeller:null,
    count:0,

    getSeller: async (args) => {
        set({ isGettingSeller: true })
        try {
            let { keyword, currentPage } = args
            let link = `seller/?page=${currentPage||1}`
            if (keyword) link += `&keyword=${keyword}`
            const { data } = await axio.get(link)
            set({seller:data.seller}) 
             set({count:data.count}) 
        } catch (error) {
            console.log(error.message);
        } finally {
            set({ isGettingSeller: false })
        }
    },

    getSingleSeller: async (id) => {
        set({ gettingSingleSeller: true })
        try {
            const { data } = await axio.get(`/seller/${id}`)
            set({singleSeller:data.seller})      
        } catch (error) {
            console.log(error.data.error.message);
        } finally {
            set({ gettingSingleSeller: false })
        }
    }
}))

export default useSellerStore