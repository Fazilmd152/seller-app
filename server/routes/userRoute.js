import express from 'express'
import { changePassword, getMe, signIn, signOut, signUp, updateAccount } from '../controller/authController.js'
import isAuthenticate from '../middlewares/isAuthenticate.js'
const router=express.Router()

router.get("/getme",isAuthenticate,getMe)
router.post("/signup",signUp)
router.post("/signin",signIn)
router.get("/signout",isAuthenticate,signOut)
router.put("/updateaccount",isAuthenticate,updateAccount)
router.put("/changepassword",isAuthenticate,changePassword)


export default router