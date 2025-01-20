import express from 'express'
import isAuthenticate from '../middlewares/isAuthenticate.js'
import { addDescription, getAllSeller, getSingleSeller } from '../controller/sellerController.js'
const router=express.Router()


router.post("/desc",isAuthenticate,addDescription)
router.get("/",isAuthenticate,getAllSeller)
router.get("/:id",isAuthenticate,getSingleSeller)




export default router