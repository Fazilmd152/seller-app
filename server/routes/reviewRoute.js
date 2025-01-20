import express from 'express'
import isAuthenticate from '../middlewares/isAuthenticate.js'
import { addReview, deleteReview, editReview, getReviewBySeller } from '../controller/reviewController.js'
const router = express.Router()


router.delete("/:id", isAuthenticate, deleteReview)
      .post("/:id", isAuthenticate, addReview)
      .put("/:id", isAuthenticate, editReview)
      .get("/:id", isAuthenticate, getReviewBySeller)




export default router