import { create } from 'zustand'
import axio from './instance/axiosInstance.ts'
import { AuthStore } from './interface/Interface.ts'
import toast from 'react-hot-toast'



const useAuthStore=create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  isCheckingAuth: true,
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isChangingPassword: false,
  isUpdatingProfile: false,

  signIn: async (formData) => {
    set({ isLoggingIn: true })
    try {
      const { data } = await axio.post("/auth/signin", formData)
      set({authUser:data.seller})
      set({isAuthenticated:true})
      toast.success(`Welcom ${get().authUser.name} !`)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIn: false })
    }
  },

  signUp: async (formData) => {
    set({ isSigningUp: true })
    try {
      const { data } = await axio.post("/auth/signup", formData)
      set({authUser:data.seller})
      toast.success("Signed up succesfully")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false })
    }
  },

  signOut: async () => {
    try {
      await axio.get("/auth/signout")
      toast.success("Signed out succesfully")
      set({isAuthenticated:false})
    } catch (error) {
      console.log(error);
    }
  },

  changePassword: async (args) => {
    try {
      set({ isChangingPassword: true })
      const { data } = await axio.put("/auth/changepassword", args)
      return data
    } catch (error) {
      console.log(error);
    } finally {
      set({ isChangingPassword: false })
    }
  },

  loadUser:async()=>{
    try {
      const {data}=await axio.get('/auth/getme')
      set({authUser:data.seller})
      set({isAuthenticated:true})
    } catch (error) {
      set({isAuthenticated:false})
      set({authUser:null})
    }finally{
      set({isCheckingAuth:false})
    }
  }



}))

export default useAuthStore