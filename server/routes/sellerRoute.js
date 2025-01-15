import express from 'express'
import isAuthenticate from '../middlewares/isAuthenticate.js'
import { addDescription, getAllSeller } from '../controller/sellerController.js'
const router=express.Router()


router.post("/desc",isAuthenticate,addDescription)
router.get("/",isAuthenticate,getAllSeller)




export default router