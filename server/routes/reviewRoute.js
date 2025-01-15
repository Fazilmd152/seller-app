import express from 'express'
import isAuthenticate from '../middlewares/isAuthenticate.js'
import { addReview, deleteReview, editReview } from '../controller/reviewController.js'
const router = express.Router()


router.delete("/:id", isAuthenticate, deleteReview)
      .post("/:id", isAuthenticate, addReview)
      .put("/:id", isAuthenticate, editReview)




export default router